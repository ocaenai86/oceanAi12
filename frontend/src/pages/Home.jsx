import React from "react";
import OceanAIIdeaMachineSmart from "../components/OceanAIIdeaMachineSmart";
import "../styles/main.css";

export default function Home() {
  return (
    <div className="oceanai-page">

      {/* هدر */}
      <header className="hero">
        <h1 className="hero-title">OceanAI</h1>
        <p className="hero-subtitle">
          اقیانوس هوش مصنوعی، اتوماسیون، طراحی سایت و اپلیکیشن برای کسب درآمد و فریلنسری.
        </p>
        <a href="#pricing" className="btn-primary">مشاهده پکیج‌ها</a>
      </header>

      {/* بخش ویژگی‌ها */}
      <section className="features">
        <h2 className="section-title">چرا OceanAI؟</h2>
        <div className="grid">
          <div className="card neon-card">ربات‌ها و اتوماسیون کسب‌وکار</div>
          <div className="card neon-card">طراحی سایت و پنل مدیریت</div>
          <div className="card neon-card">اپلیکیشن موبایل با هوش مصنوعی</div>
          <div className="card neon-card">پکیج‌های فریلنسری و آموزش</div>
        </div>
      </section>

      {/* بخش ماشین تولید ایده OceanAI */}
      <section className="idea-machine-section">
        <h2 className="section-title">ماشین تولید ایدهٔ هوشمند OceanAI</h2>
        <p className="section-subtitle">
          با هوش مصنوعی OceanAI، بهترین ایده‌ها برای اتوماسیون، فریلنسری و کسب درآمد را بساز.
        </p>

        <div className="idea-machine-wrapper">
          <OceanAIIdeaMachineSmart />
        </div>
      </section>

      {/* بخش پکیج‌ها */}
      <section id="pricing" className="pricing">
        <h2 className="section-title">پکیج‌های کسب درآمد</h2>
        <div className="grid">
          <div className="card pricing-card">
            <h3>پکیج شروع فریلنسری</h3>
            <p>وب‌سایت شخصی + اتوماسیون ساده + راهنمای جذب مشتری.</p>
          </div>
          <div className="card pricing-card">
            <h3>پکیج اتوماسیون کسب‌وکار</h3>
            <p>پنل مدیریت + ربات‌ها + گزارش‌گیری هوشمند.</p>
          </div>
          <div className="card pricing-card">
            <h3>پکیج استودیو هوش مصنوعی</h3>
            <p>سیستم تولید محتوا + API هوش مصنوعی + داشبورد.</p>
          </div>
        </div>
      </section>

      {/* فوتر */}
      <footer className="footer">
        <p>برای سفارش و همکاری: <strong>ocaenai.86@gmail.com</strong></p>
      </footer>
    </div>
  );
}
