import Link from "next/link";

export function RegisterForm() {
  return (
    <div className="auth-card">
      <img className="logo-lg" src="/assets/images/logo-mark.png" alt="" />
      <h3>Invite-only staff access</h3>
      <p className="tiny">
        Public users do not need accounts. Admins can invite editors from the dashboard, and invited staff can sign
        in here.
      </p>
      <p className="tiny">
        Already invited? <Link href="/login">Login</Link>
      </p>
    </div>
  );
}
