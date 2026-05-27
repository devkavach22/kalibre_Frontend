import React, { useState } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const FILTER_LABELS = {
  workMode: ['Work From Office', 'Remote', 'Hybrid'],
  department: {
    base: ['Customer Success, Service & Operations', 'Sales & Business Development', 'Human Resources', 'Finance & Accounting'],
    extra: ['Marketing & Communications', 'IT & Information Security', 'Engineering & Tech']
  },
  salary: {
    base: ['0-3 Lakhs', '3-6 Lakhs', '6-10 Lakhs', '10-15 Lakhs'],
    extra: ['15-25 Lakhs', '25-50 Lakhs']
  },
  companyType: {
    base: ['Corporate', 'Startup', 'MNC', 'SME'],
    extra: ['Government', 'NGO / Non-Profit']
  },
  roleCategory: {
    base: ['BD / Pre Sales', 'Retail & B2C Sales', 'Recruitment & Talent Acquisition', 'Accounting & Taxation'],
    extra: ['Software Development', 'Operations Management', 'Digital Marketing']
  },
  location: {
    base: ['Ahmedabad', 'New Delhi', 'Sanand', 'Gandhinagar'],
    extra: ['Mumbai', 'Bengaluru', 'Hyderabad']
  }
};

// eslint-disable-next-line react-refresh/only-export-components
export function getStandardDepartment(deptName) {
  if (!deptName) return '';
  const lower = deptName.toLowerCase();
  if (lower === 'sales' || lower.includes('sales') || lower.includes('business development')) {
    return 'Sales & Business Development';
  }
  if (lower.includes('customer success') || lower.includes('customer service') || lower.includes('operations')) {
    return 'Customer Success, Service & Operations';
  }
  if (lower.includes('human resource') || lower === 'hr') {
    return 'Human Resources';
  }
  if (lower.includes('finance') || lower.includes('accounting')) {
    return 'Finance & Accounting';
  }
  if (lower.includes('marketing')) {
    return 'Marketing & Communications';
  }
  if (lower.includes('it ') || lower.includes('information security')) {
    return 'IT & Information Security';
  }
  if (lower.includes('engineering') || lower.includes('tech')) {
    return 'Engineering & Tech';
  }
  return deptName;
}

function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 py-3">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-xs font-semibold text-[#111111]"
      >
        {title}
        <svg className={`w-3.5 h-3.5 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="mt-2.5">{children}</div>}
    </div>
  );
}

function CheckboxList({ baseItems, extraItems = [], counts, selected, onToggle }) {
  const [showMore, setShowMore] = useState(false);
  const visible = showMore ? [...baseItems, ...extraItems] : baseItems;
  return (
    <div className="flex flex-col gap-2">
      {visible.map((label) => {
        const count = counts[label] || 0;
        return (
          <label key={label} className="flex items-center gap-2 cursor-pointer group">
            <input type="checkbox" checked={selected.includes(label)} onChange={() => onToggle(label)} className="w-3.5 h-3.5 accent-[#C8102E] rounded flex-shrink-0" />
            <span className="text-[12px] text-gray-600 group-hover:text-[#C8102E] transition-colors flex-1 leading-tight">
              {label}
              <span className="text-gray-400"> ({count})</span>
            </span>
          </label>
        );
      })}
      {extraItems.length > 0 && (
        <button onClick={() => setShowMore(!showMore)} className="text-[11px] text-[#C8102E] font-medium mt-0.5 text-left hover:underline flex items-center gap-0.5">
          {showMore ? (
            <><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>View Less</>
          ) : (
            <><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>View More</>
          )}
        </button>
      )}
    </div>
  );
}

export function FilterContent({
  selectedWorkMode, setSelectedWorkMode,
  selectedDept, setSelectedDept,
  selectedSalary, setSelectedSalary,
  selectedCompany, setSelectedCompany,
  selectedRole, setSelectedRole,
  selectedLocation, setSelectedLocation,
  expRange, setExpRange,
  toggle,
  liveCounts,
}) {
  return (
    <>
      <FilterSection title="Work Mode">
        <div className="flex flex-wrap gap-2">
          {FILTER_LABELS.workMode.map((mode) => {
            const count = liveCounts.workMode[mode] || 0;
            return (
              <button
                key={mode}
                onClick={() => toggle(setSelectedWorkMode, selectedWorkMode, mode)}
                className="text-[11px] px-3 py-1.5 rounded-full border transition-all"
                style={selectedWorkMode.includes(mode)
                  ? { background: 'linear-gradient(92.62deg,#FA2329 0.91%,#B10D1C 99.09%)', color: '#fff', border: 'none' }
                  : { borderColor: '#e5e7eb', color: '#666' }}
              >
                {mode} ({count})
              </button>
            );
          })}
        </div>
      </FilterSection>

      <FilterSection title="Experience">
        <div className="px-1">
          <input type="range" min={0} max={30} value={expRange} onChange={(e) => setExpRange(e.target.value)} className="w-full accent-[#C8102E]" />
          <div className="flex justify-between text-[11px] text-gray-400 mt-1">
            <span>0 Yrs</span>
            <span className="text-[#C8102E] font-medium">{expRange} Yrs</span>
            <span>30 Yrs</span>
          </div>
        </div>
      </FilterSection>

      <FilterSection title="Department">
        <CheckboxList baseItems={FILTER_LABELS.department.base} extraItems={FILTER_LABELS.department.extra} counts={liveCounts.department} selected={selectedDept} onToggle={(v) => toggle(setSelectedDept, selectedDept, v)} />
      </FilterSection>

      <FilterSection title="Salary">
        <CheckboxList baseItems={FILTER_LABELS.salary.base} extraItems={FILTER_LABELS.salary.extra} counts={liveCounts.salary} selected={selectedSalary} onToggle={(v) => toggle(setSelectedSalary, selectedSalary, v)} />
      </FilterSection>

      <FilterSection title="Company Type">
        <CheckboxList baseItems={FILTER_LABELS.companyType.base} extraItems={FILTER_LABELS.companyType.extra} counts={liveCounts.companyType} selected={selectedCompany} onToggle={(v) => toggle(setSelectedCompany, selectedCompany, v)} />
      </FilterSection>

      <FilterSection title="Role Category">
        <CheckboxList baseItems={FILTER_LABELS.roleCategory.base} extraItems={FILTER_LABELS.roleCategory.extra} counts={liveCounts.roleCategory} selected={selectedRole} onToggle={(v) => toggle(setSelectedRole, selectedRole, v)} />
      </FilterSection>

      <FilterSection title="Location" defaultOpen={false}>
        <CheckboxList baseItems={FILTER_LABELS.location.base} extraItems={FILTER_LABELS.location.extra} counts={liveCounts.location} selected={selectedLocation} onToggle={(v) => toggle(setSelectedLocation, selectedLocation, v)} />
      </FilterSection>
    </>
  );
}