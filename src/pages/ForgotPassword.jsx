import { useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, ArrowLeft, Loader2 } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";
import { useLang } from "@/lib/i18n";

const STRINGS = {
  fr: { title: "Mot de passe oublié", subtitle: "Entrez votre email pour recevoir un lien de réinitialisation", label: "Email", placeholder: "vous@exemple.com", submit: "Envoyer le lien", submitting: "Envoi...", sent: "Si un compte existe avec cet email, vous recevrez un lien de réinitialisation.", back: "Retour à la connexion" },
  en: { title: "Forgot password", subtitle: "Enter your email to receive a reset link", label: "Email", placeholder: "you@example.com", submit: "Send reset link", submitting: "Sending...", sent: "If an account exists with that email, you'll receive a password reset link shortly.", back: "Back to log in" },
  es: { title: "Contraseña olvidada", subtitle: "Ingresa tu email para recibir un enlace de restablecimiento", label: "Email", placeholder: "tu@ejemplo.com", submit: "Enviar enlace", submitting: "Enviando...", sent: "Si existe una cuenta con ese email, recibirás un enlace de restablecimiento.", back: "Volver a iniciar sesión" },
  ru: { title: "Забыли пароль", subtitle: "Введите email для получения ссылки сброса пароля", label: "Email", placeholder: "вы@пример.com", submit: "Отправить ссылку", submitting: "Отправка...", sent: "Если аккаунт с таким email существует, вы получите ссылку для сброса пароля.", back: "Вернуться ко входу" },
  zh: { title: "忘记密码", subtitle: "输入您的邮箱以接收重置链接", label: "邮箱", placeholder: "您@示例.com", submit: "发送重置链接", submitting: "发送中...", sent: "如果该邮箱存在账户，您将收到密码重置链接。", back: "返回登录" },
  pt: { title: "Esqueceu a senha", subtitle: "Digite seu email para receber um link de redefinição", label: "Email", placeholder: "voce@exemplo.com", submit: "Enviar link", submitting: "Enviando...", sent: "Se existir uma conta com esse email, você receberá um link de redefinição de senha.", back: "Voltar ao login" },
};

export default function ForgotPassword() {
  const { lang } = useLang();
  const s = STRINGS[lang] || STRINGS.fr;

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await base44.auth.resetPasswordRequest(email);
    } catch {
      // Always show success regardless
    } finally {
      setLoading(false);
      setSent(true);
    }
  };

  return (
    <AuthLayout
      icon={Mail}
      title={s.title}
      subtitle={s.subtitle}
      footer={
        <Link to="/login" className="text-primary font-medium hover:underline">
          <ArrowLeft className="w-3 h-3 inline mr-1" />{s.back}
        </Link>
      }
    >
      {sent ? (
        <p className="text-sm text-foreground text-center">{s.sent}</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{s.label}</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
              <Input
                id="email"
                type="email"
                autoComplete="email"
                autoFocus
                placeholder={s.placeholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-12"
                required
              />
            </div>
          </div>
          <Button type="submit" className="w-full h-12 font-medium" disabled={loading}>
            {loading ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" />{s.submitting}</>
            ) : s.submit}
          </Button>
        </form>
      )}
    </AuthLayout>
  );
}