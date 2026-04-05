"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp, X } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer"

// ── Mobile detection ──────────────────────────────────────────────────────────
function useIsMobile() {
  const [mobile, setMobile] = React.useState(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches
  );
  React.useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)');
    const handler = (e) => setMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return mobile;
}

// ── Shared context (bridges Radix Select ↔ Drawer on mobile) ─────────────────
const MobileSelectCtx = React.createContext(null);

// ── Select root: wraps Radix root + provides context ─────────────────────────
const Select = ({ value, defaultValue, onValueChange, open: controlledOpen, onOpenChange, ...props }) => {
  const isMobile = useIsMobile();
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? '');
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const resolvedValue = value !== undefined ? value : internalValue;
  const handleValueChange = (v) => {
    if (value === undefined) setInternalValue(v);
    onValueChange?.(v);
  };

  // On desktop just use Radix as-is
  if (!isMobile) {
    return (
      <SelectPrimitive.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        open={controlledOpen}
        onOpenChange={onOpenChange}
        {...props}
      />
    );
  }

  // On mobile provide context so children can hook in
  return (
    <MobileSelectCtx.Provider value={{
      value: resolvedValue,
      onValueChange: (v) => { handleValueChange(v); setDrawerOpen(false); },
      drawerOpen,
      setDrawerOpen,
    }}>
      {props.children}
    </MobileSelectCtx.Provider>
  );
};
Select.displayName = 'Select';

// ── SelectGroup / SelectValue pass-through ────────────────────────────────────
const SelectGroup = SelectPrimitive.Group;

const SelectValue = React.forwardRef(({ placeholder, ...props }, ref) => {
  const ctx = React.useContext(MobileSelectCtx);
  if (!ctx) return <SelectPrimitive.Value ref={ref} placeholder={placeholder} {...props} />;
  // Mobile: show current value label from items or placeholder
  return <span>{ctx.value || <span className="text-muted-foreground">{placeholder}</span>}</span>;
});
SelectValue.displayName = 'SelectValue';

// ── SelectTrigger ─────────────────────────────────────────────────────────────
const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => {
  const ctx = React.useContext(MobileSelectCtx);
  if (!ctx) {
    return (
      <SelectPrimitive.Trigger
        ref={ref}
        className={cn(
          "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
          className
        )}
        {...props}
      >
        {children}
        <SelectPrimitive.Icon asChild>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
    );
  }
  return (
    <button
      ref={ref}
      type="button"
      onClick={() => ctx.setDrawerOpen(true)}
      className={cn(
        "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </button>
  );
});
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

// ── SelectContent: Drawer on mobile, popper on desktop ───────────────────────
const SelectContent = React.forwardRef(({ className, children, position = "popper", title, ...props }, ref) => {
  const ctx = React.useContext(MobileSelectCtx);

  if (!ctx) {
    return (
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          ref={ref}
          className={cn(
            "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            position === "popper" &&
              "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
            className
          )}
          position={position}
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.Viewport
            className={cn("p-1", position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]")}>
            {children}
          </SelectPrimitive.Viewport>
          <SelectScrollDownButton />
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    );
  }

  // Mobile: render as Drawer
  return (
    <Drawer open={ctx.drawerOpen} onOpenChange={ctx.setDrawerOpen}>
      <DrawerContent>
        {title && (
          <DrawerHeader className="flex items-center justify-between">
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerClose asChild>
              <button className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                <X className="h-4 w-4" />
              </button>
            </DrawerClose>
          </DrawerHeader>
        )}
        <div className="px-4 pb-6 space-y-1 overflow-y-auto max-h-[60vh]">
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  );
});
SelectContent.displayName = SelectPrimitive.Content.displayName;

// ── SelectItem: button on mobile, Radix item on desktop ──────────────────────
const SelectItem = React.forwardRef(({ className, children, value, ...props }, ref) => {
  const ctx = React.useContext(MobileSelectCtx);

  if (!ctx) {
    return (
      <SelectPrimitive.Item
        ref={ref}
        value={value}
        className={cn(
          "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          className
        )}
        {...props}
      >
        <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
          <SelectPrimitive.ItemIndicator>
            <Check className="h-4 w-4" />
          </SelectPrimitive.ItemIndicator>
        </span>
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      </SelectPrimitive.Item>
    );
  }

  const isSelected = ctx.value === value;
  return (
    <button
      type="button"
      onClick={() => ctx.onValueChange(value)}
      className={cn(
        "w-full flex items-center justify-between rounded-xl px-4 py-3 text-sm text-left transition-colors",
        isSelected ? "bg-primary/10 text-primary font-semibold" : "hover:bg-muted",
        className
      )}
    >
      <span>{children}</span>
      {isSelected && <Check className="h-4 w-4 shrink-0" />}
    </button>
  );
});
SelectItem.displayName = SelectPrimitive.Item.displayName;

// ── Remaining pass-throughs ───────────────────────────────────────────────────
const SelectLabel = React.forwardRef(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

const SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn("flex cursor-default items-center justify-center py-1", className)}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn("flex cursor-default items-center justify-center py-1", className)}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}