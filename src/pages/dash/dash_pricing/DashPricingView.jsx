import React, { useState } from 'react';
import Container from '../../../components/ui/Container';

const CheckItem = ({ text, extra }) => (
  <li className="flex items-start justify-between gap-3">
    <div className="flex items-start gap-3">
      <svg
        viewBox="0 0 24 24"
        className="mt-1 h-4 w-4 flex-shrink-0 text-[#2f66ff]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M5 13l4 4L19 7" />
      </svg>
      <span className="text-[15px] leading-7 text-[#2b2f42]">{text}</span>
    </div>
    {extra ? <span className="text-[15px] font-semibold text-[#2b2f42]">{extra}</span> : null}
  </li>
);

const PlanCard = ({ title, price, period, subtitle, items, button, highlight }) => {
  const [open, setOpen] = useState(false);

  const VISIBLE_COUNT = 8;
  const visibleItems = items.slice(0, VISIBLE_COUNT);
  const hiddenItems = items.slice(VISIBLE_COUNT);
  const hasHidden = hiddenItems.length > 0;

  return (
    <div
      className={`flex h-full flex-col rounded-3xl border p-8 shadow-sm ${
        highlight ? 'border-[#9fb8ff] bg-[#eef3ff]' : 'border-[#CFE0FF] bg-white'
      }`}
    >
      <div className="mb-4">
        <h3 className="text-[1.75rem] font-semibold text-[#111b2b]">{title}</h3>
        <p className="text-[1rem] font-semibold text-[#111b2b]">
          ({price}) / {period}
        </p>
        <p className="mt-2 text-[15px] leading-7 text-[#4c5370]">{subtitle}</p>
      </div>

      {/* Always visible: first 8 items */}
      <ul className="space-y-2">
        {visibleItems.map((it, idx) => (
          <CheckItem key={idx} text={it.text} extra={it.extra} />
        ))}
      </ul>

      {/* Collapsible extra items */}
      {hasHidden && (
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            open ? 'mt-2 max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
          }`}
          aria-hidden={!open}
        >
          <ul className="space-y-2">
            {hiddenItems.map((it, idx) => (
              <CheckItem key={idx + visibleItems.length} text={it.text} extra={it.extra} />
            ))}
          </ul>
        </div>
      )}

      {/* Toggle button — only if there are hidden items */}
      {hasHidden && (
        <button
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          className="mt-3 flex items-center gap-1 text-sm font-medium text-[#2f66ff] focus:underline focus:outline-none"
        >
          {open
            ? 'Show less'
            : `Show ${hiddenItems.length} more feature${hiddenItems.length === 1 ? '' : 's'}`}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      )}

      {/* CTA Button */}
      <div className="mt-auto pt-6">
        <button
          className={`w-full rounded-xl px-6 py-3 font-semibold ${
            highlight
              ? 'bg-[#dce6ff] text-[#111b2b] transition-colors hover:bg-[#d4e0ff]'
              : 'bg-[#2f66ff] text-white transition-colors hover:bg-[#1f4fe0]'
          }`}
        >
          {button}
        </button>
      </div>
    </div>
  );
};

const DashPricingView = () => {
  return (
    <section className="mx-auto max-w-7xl py-16">
      <Container>
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-[2.5rem] leading-tight font-bold text-[#111b2b]">Pricing</h2>
          <p className="text-[16px] text-[#4c5370]">You are currently on the plan</p>
        </div>

        <div className="grid grid-cols-1 gap-4 px-8 md:grid-cols-3">
          <PlanCard
            title="Free"
            price="$0"
            period="month"
            subtitle="Perfect for new investors and small portfolios."
            items={[
              { text: 'Credits', extra: '2.5' },
              { text: 'Core AI deal analysis' },
              { text: 'Hard allocation, no rollover.' },
              { text: 'Limited deal pulls and short summaries.' },
              { text: 'Residential property evaluation' },
              { text: 'Basic rent & return estimates' },
              { text: 'Limited AI-generated reports' },
              { text: 'Free trial included' },
            ]}
            button="Current Plan"
            highlight
          />

          <PlanCard
            title="Pro"
            price="$29"
            period="month"
            subtitle="Built for active investors who need deeper insights."
            items={[
              { text: 'Credits', extra: '15' },
              { text: 'Basic ROI and comps.' },
              { text: 'Single-deal analysis.' },
              { text: 'Priority AI processing' },
              { text: 'Advanced property & land analysis' },
              { text: 'Fix & flip profitability evaluation' },
              { text: 'Long-term & short-term rental insights' },
              { text: 'Downloadable Excel & document reports' },
              { text: 'Limited CSV exports with soft throttling near allocation.' },
              { text: 'Free trial included' },
            ]}
            button="Upgrade"
          />

          <PlanCard
            title="Pro Plus"
            price="$59"
            period="month"
            subtitle="Designed for serious investors and professionals."
            items={[
              { text: 'Credits', extra: '50' },
              { text: 'Profitable tier.' },
              { text: 'Bulk deal analysis.' },
              { text: 'Land and residential logic.' },
              { text: 'Full AI investment toolkit' },
              { text: 'High-volume deal analysis' },
              { text: 'Advanced scenario modeling' },
              { text: 'Sensitivity analysis and large CSV exports.' },
              { text: 'Land subdivision & utility planning support' },
              { text: 'Maximum report generation limits' },
              { text: 'Free trial included' },
              { text: 'Upgrade, downgrade, or cancel anytime.' },
              { text: 'Pricing visible. No commitments. No friction.' },
            ]}
            button="Upgrade"
          />
        </div>
      </Container>
    </section>
  );
};

export default DashPricingView;
