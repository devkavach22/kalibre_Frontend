import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

import Logo from "../assets/Logo.png";
import Footerbg from "../assets/Footer.jpg";

import Taksh from "../assets/Taksh.png";
import bhumika from "../assets/bhumika.png";
import Rajwant from "../assets/Rajwant.png";

import FormBootmBg from "../assets/FormImage.jpg";

const testimonials = [
  {
    name: 'Shakib Mahmud',
    role: 'Operating Officer',
    rating: 5,
    text: '"Excellent platform with a modern and user-friendly interface. The design is clean, smooth, and very easy to navigate. It has improved our workflow and overall user experience significantly."',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
  {
    name: 'Priya Sharma',
    role: 'HR Manager',
    rating: 5,
    text: '"Kalibre transformed our hiring pipeline completely. We filled 20+ positions in record time with candidates who perfectly matched our culture. Highly recommend their talent acquisition service!"',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
  {
    name: 'Rajesh Patel',
    role: 'CEO, TechNova',
    rating: 5,
    text: '"Their outsourcing model gave us flexibility we never had before. Skilled professionals onboarded within days. The team is responsive, professional, and genuinely cares about our success."',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  },
  {
    name: 'Ananya Desai',
    role: 'Talent Lead, Infovance',
    rating: 5,
    text: '"The remote staffing solution from Kalibre exceeded every expectation. Seamless communication, top-tier profiles, and a support team that was with us every step of the way. Outstanding!"',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
  },
];

function TestiCard({ data, isActive }) {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 32,
        borderBottom: isActive ? '4px solid #C1272D' : '4px solid #FFEBEB',
        padding: '40px 48px',
        boxShadow: isActive
          ? '0 30px 70px rgba(193,39,45,0.12), 0 10px 30px rgba(0,0,0,0.04)'
          : '0 4px 20px rgba(0,0,0,0.03)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        width: '100%',
        maxWidth: 720,
        margin: '0 auto',
        boxSizing: 'border-box',
        zIndex: isActive ? 3 : 1,
      }}
    >
      <svg style={{ position: 'absolute', left: 28, bottom: '50%', transform: 'translateY(50%)', opacity: isActive ? 1 : 0.4, transition: 'opacity 0.3s' }} width="46" height="34" viewBox="0 0 46 34" fill="none">
        <path d="M19.5 0C8.5 4.5 2 13 0 23.5L8.5 27.5C10 21 13 16 17.5 15.5V33.5H31V14.5C31 6.5 26.5 1.5 19.5 0ZM34.5 0C23.5 4.5 17 13 15 23.5L23.5 27.5C25 21 28 16 32.5 15.5V33.5H46V14.5C46 6.5 41.5 1.5 34.5 0Z" fill="#FFCDD0" />
      </svg>
      <svg style={{ position: 'absolute', right: 28, bottom: 18, opacity: isActive ? 1 : 0.4, transition: 'opacity 0.3s' }} width="46" height="34" viewBox="0 0 46 34" fill="none">
        <path d="M11.5 33.5C22.5 29 29 20.5 31 10L22.5 6C21 12.5 18 17.5 13.5 18V0H0V19C0 27 4.5 32 11.5 33.5ZM26.5 33.5C37.5 29 44 20.5 46 10L37.5 6C36 12.5 33 17.5 28.5 18V0H15V19C15 27 19.5 32 26.5 33.5Z" fill="#FFCDD0" />
      </svg>
      <div style={{ width: 80, height: 80, borderRadius: '50%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: isActive ? '0 8px 24px rgba(193,39,45,0.25)' : '0 4px 12px rgba(0,0,0,0.08)', marginBottom: 14 }}>
        <img src={data.avatar} alt={data.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div style={{ display: 'flex', gap: 4, marginBottom: 12 }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill={i < data.rating ? '#FFB800' : '#e5e7eb'}>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>
      <h3 style={{ fontWeight: 800, fontSize: 19, color: '#C1272D', margin: '0 0 4px 0', textAlign: 'center' }}>{data.name}</h3>
      <p style={{ fontSize: 13, fontWeight: 600, color: '#333', margin: '0 0 16px 0', textAlign: 'center' }}>{data.role}</p>
      <p style={{ fontSize: 15, color: '#4B5563', lineHeight: '1.8', textAlign: 'center', margin: 0, maxWidth: 540, position: 'relative', zIndex: 1 }}>{data.text}</p>
    </div>
  );
}

function TestimonialSection() {
  const [active, setActive] = useState(0);
  const total = testimonials.length;
  const prev = () => setActive((a) => (a - 1 + total) % total);
  const next = () => setActive((a) => (a + 1) % total);
  const getIndex = (offset) => (active + offset + total) % total;

  return (
    <section style={{ width: '100%', background: 'linear-gradient(160deg, #fff 60%, #FFF5F5 100%)', padding: '72px 0 32px', overflow: 'hidden', boxSizing: 'border-box' }}>
      <style>{`
        .t-slider-container { display: flex; align-items: center; justify-content: center; position: relative; width: 100%; max-width: 1440px; margin: 0 auto; padding: 20px 0; }
        .t-card-wrap { transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1); flex: 0 0 50%; max-width: 680px; box-sizing: border-box; }
        .t-card-side-left { opacity: 1; transform: scale(0.85) translateX(18%); pointer-events: none; }
        .t-card-active { opacity: 1; transform: scale(1); z-index: 5; }
        .t-card-side-right { opacity: 1; transform: scale(0.85) translateX(-18%); pointer-events: none; }
        .t-dot { transition: all 0.3s ease; border: none; cursor: pointer; padding: 0; }
        .t-arrow { transition: background 0.2s, transform 0.2s; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; position: absolute; top: 50%; transform: translateY(-50%); z-index: 10; width: 46px; height: 46px; border-radius: 12px; background: #C1272D; box-shadow: 0 4px 16px rgba(193,39,45,0.3); }
        .t-arrow:hover { transform: scale(1.05) translateY(-50%); background: #a01419 !important; }
        .t-arrow-left { left: 5%; }
        .t-arrow-right { right: 5%; }
        @media (max-width: 1280px) { .t-arrow-left { left: 3%; } .t-arrow-right { right: 3%; } }
        @media (max-width: 1024px) { .t-card-wrap { flex: 0 0 75%; } .t-arrow-left { left: 2%; } .t-arrow-right { right: 2%; } }
        @media (max-width: 640px) { .t-card-wrap { flex: 0 0 95%; } .t-card-side-left, .t-card-side-right { display: none; } .t-arrow-left { left: 10px; } .t-arrow-right { right: 10px; } }
      `}</style>
      <div style={{ textAlign: 'center', marginBottom: 52, padding: '0 16px' }}>
        <span style={{ display: 'inline-block', background: '#FFF0F1', color: '#C1272D', fontSize: 13, fontWeight: 700, letterSpacing: '0.4px', padding: '6px 24px', borderRadius: 30, marginBottom: 16 }}>Testimonial</span>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: '#1F2937', margin: 0, lineHeight: 1.2 }}>
          Feedback from <span style={{ color: '#C1272D' }}>Satisfied</span> Customers
        </h2>
      </div>
      <div className="t-slider-container">
        <button onClick={prev} className="t-arrow t-arrow-left"><ChevronLeft style={{ width: 24, height: 24, color: '#fff' }} /></button>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', overflow: 'visible' }}>
          <div className="t-card-wrap t-card-side-left"><TestiCard data={testimonials[getIndex(-1)]} isActive={false} /></div>
          <div className="t-card-wrap t-card-active"><TestiCard data={testimonials[active]} isActive={true} /></div>
          <div className="t-card-wrap t-card-side-right"><TestiCard data={testimonials[getIndex(1)]} isActive={false} /></div>
        </div>
        <button onClick={next} className="t-arrow t-arrow-right"><ChevronRight style={{ width: 24, height: 24, color: '#fff' }} /></button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 40 }}>
        {testimonials.map((_, i) => (
          <button key={i} className="t-dot" onClick={() => setActive(i)} style={{ width: i === active ? 48 : 20, height: 10, borderRadius: 20, background: i === active ? '#C1272D' : '#FFCDD0' }} />
        ))}
      </div>
    </section>
  );
}

function LeadershipSection() {
  const team = [
    { name: 'Dr. Rajwant Kumar Rai', img: Rajwant },
    { name: 'Bhumika Iyer', img: bhumika },
    { name: 'Mr. Taksh Raval', img: Taksh },
  ];

  return (
    <section style={{ width: '100%', background: '#fff', padding: '64px 0 80px', boxSizing: 'border-box' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
        <style>{`
          .lead-card-container { position: relative; width: 100%; max-width: 320px; margin: 0 auto; }
          .lead-bg-accent { position: absolute; top: -8px; left: -8px; right: 8px; bottom: 8px; background: #A31D22; border-radius: 24px; z-index: 1; transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1); }
          .lead-main-frame { position: relative; background: #fff; border-radius: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); overflow: hidden; z-index: 2; border: 1px solid #E5E7EB; transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.3s ease; }
          .lead-img-wrap img { transition: transform 0.4s ease; transform-origin: top center; }
          .lead-card-container:hover .lead-main-frame { transform: translateY(-6px); box-shadow: 0 20px 40px rgba(163,29,34,0.12); }
          .lead-card-container:hover .lead-bg-accent { transform: translate(-3px, 3px); }
          .lead-card-container:hover .lead-img-wrap img { transform: scale(1.04); }
        `}</style>
        <span style={{ display: 'inline-block', background: '#FFF0F1', color: '#C1272D', fontSize: 13, fontWeight: 700, letterSpacing: '0.4px', padding: '6px 24px', borderRadius: 30, marginBottom: 16 }}>Leadership</span>
        <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 800, color: '#0A192F', margin: '0 0 48px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          THE TEAM TURNING <span style={{ color: '#C1272D' }}>IDEAS</span> INTO REALITY
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px 32px', justifyContent: 'center', maxWidth: '1140px', margin: '0 auto' }}>
          {team.map((member, idx) => (
            <div key={idx} className="lead-card-container">
              <div className="lead-bg-accent" />
              <div className="lead-main-frame">
                <div className="lead-img-wrap" style={{ width: '100%', height: 350, background: '#F9FAFB', overflow: 'hidden' }}>
                  <img src={member.img} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
                <div style={{ padding: '20px 16px', background: '#fff', textAlign: 'center' }}>
                  <h4 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#0A192F' }}>{member.name}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactFormSection() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      const filteredValue = value.replace(/[^A-Za-z\s]/g, '');
      if (filteredValue.length <= 12) { setFormData({ ...formData, [name]: filteredValue }); setErrors({ ...errors, name: '' }); }
      return;
    }
    if (name === 'phone') {
      const filteredValue = value.replace(/[^0-9]/g, '');
      if (filteredValue.length <= 10) { setFormData({ ...formData, [name]: filteredValue }); setErrors({ ...errors, phone: '' }); }
      return;
    }
    if (name === 'email') {
      if (value.length <= 30) { setFormData({ ...formData, [name]: value }); setErrors({ ...errors, email: '' }); }
      return;
    }
    if (name === 'message') {
      if (value.length <= 300) { setFormData({ ...formData, [name]: value }); }
      return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let currentErrors = {};
    if (!formData.name.trim()) { currentErrors.name = 'Name is required'; } else if (formData.name.length > 12) { currentErrors.name = 'Name cannot exceed 12 characters'; }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) { currentErrors.email = 'Email is required'; } else if (formData.email.length > 30) { currentErrors.email = 'Email cannot exceed 30 characters'; } else if (!emailRegex.test(formData.email)) { currentErrors.email = 'Please enter a valid email address'; }
    if (!formData.phone) { currentErrors.phone = 'Phone number is required'; } else if (formData.phone.length !== 10) { currentErrors.phone = 'Phone number must be exactly 10 digits'; }
    if (formData.message.length > 300) { currentErrors.message = 'Message cannot exceed 300 characters'; }
    if (Object.keys(currentErrors).length > 0) { setErrors(currentErrors); } else { setErrors({}); console.log('Form Submitted:', formData); alert('Form submitted successfully!'); setFormData({ name: '', email: '', phone: '', message: '' }); }
  };

  return (
    <section style={{ width: '100%', backgroundImage: `url(${FormBootmBg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', padding: '50px 0 60px', boxSizing: 'border-box', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        .cf-input { width: 100%; padding: 14px 18px; border-radius: 8px; border: 1.5px solid #E5E7EB; font-size: 15px; outline: none; box-sizing: border-box; background: #fff; color: #374151; transition: border-color 0.2s; font-family: inherit; }
        .cf-input:focus { border-color: #C1272D; }
        .cf-input::placeholder { color: #9CA3AF; }
        @media (max-width: 1024px) { .cf-two-col { flex-direction: column !important; } .cf-left-col, .cf-right-col { max-width: 100% !important; width: 100% !important; height: auto !important; } }
      `}</style>
      <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 24px', boxSizing: 'border-box', position: 'relative', zIndex: 1 }}>
        <div className="cf-two-col" style={{ display: 'flex', gap: '24px', justifyContent: 'center', alignItems: 'center' }}>
          <div className="cf-left-col" style={{ width: '100%', maxWidth: '520px', height: '610px', background: '#FFFFFF', borderRadius: '20px', border: '1px solid #E5E7EB', padding: '34px 26px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#0A192F', margin: 0, lineHeight: 1.25 }}>
              Get in <span style={{ color: '#C1272D' }}>touch</span> with one of our experts
            </h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, justifyContent: 'space-between', marginTop: '14px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#374151' }}>Your Name</label>
                  <input className="cf-input" type="text" name="name" placeholder="Enter Your Name" value={formData.name} onChange={handleChange} style={{ border: errors.name ? '1.5px solid #C1272D' : '1.5px solid #E5E7EB' }} />
                  {errors.name && <span style={{ color: '#C1272D', fontSize: '11px', fontWeight: 600 }}>{errors.name}</span>}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#374151' }}>Your Email</label>
                  <input className="cf-input" type="text" name="email" placeholder="Enter Your Email" value={formData.email} onChange={handleChange} style={{ border: errors.email ? '1.5px solid #C1272D' : '1.5px solid #E5E7EB' }} />
                  {errors.email && <span style={{ color: '#C1272D', fontSize: '11px', fontWeight: 600 }}>{errors.email}</span>}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#374151' }}>Phone No.</label>
                  <input className="cf-input" type="text" name="phone" placeholder="Enter Your Number" value={formData.phone} onChange={handleChange} style={{ border: errors.phone ? '1.5px solid #C1272D' : '1.5px solid #E5E7EB' }} />
                  {errors.phone && <span style={{ color: '#C1272D', fontSize: '11px', fontWeight: 600 }}>{errors.phone}</span>}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#374151' }}>Message</label>
                    <span style={{ fontSize: '11px', color: formData.message.length >= 300 ? '#C1272D' : '#9CA3AF', fontWeight: 500 }}>{formData.message.length}/300</span>
                  </div>
                  <textarea name="message" rows="3" placeholder="Enter Your Message" value={formData.message} onChange={handleChange} style={{ width: '100%', padding: '14px 18px', borderRadius: '8px', border: errors.message ? '1.5px solid #C1272D' : '1.5px solid #E5E7EB', fontSize: '15px', outline: 'none', boxSizing: 'border-box', resize: 'none', background: '#fff', color: '#374151', fontFamily: 'inherit' }} />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button type="submit" style={{ background: '#C1272D', color: '#fff', fontSize: '14px', fontWeight: 700, padding: '12px 38px', borderRadius: '50px', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', transition: 'background 0.2s ease, transform 0.15s ease', boxShadow: '0 4px 14px rgba(193,39,45,0.25)' }} onMouseOver={(e) => { e.currentTarget.style.background = '#a01419'; e.currentTarget.style.transform = 'translateY(-1px)'; }} onMouseOut={(e) => { e.currentTarget.style.background = '#C1272D'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                  submit <ArrowUpRight style={{ width: 16, height: 16 }} />
                </button>
              </div>
            </form>
          </div>
          <div className="cf-right-col" style={{ width: '100%', maxWidth: '540px', height: '540px', background: 'linear-gradient(133.72deg, #FFFFFF 0.43%, #FFEEEF 99.57%)', borderRadius: '20px', border: '1px solid #FFE4E4', padding: '32px 28px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignSelf: 'center' }}>
            <div>
              <span style={{ display: 'inline-block', background: '#FFF0F1', color: '#C1272D', fontSize: 14, fontWeight: 700, letterSpacing: '0.5px', padding: '6px 16px', borderRadius: 30, marginBottom: 12 }}>Contact Us</span>
              <h3 style={{ fontSize: '26px', fontWeight: 800, color: '#0A192F', margin: 0, lineHeight: 1.3 }}>Let's Work <span style={{ color: '#C1272D' }}>Together</span><br />To Achieve Your Goals</h3>
            </div>
            <p style={{ fontSize: '15.5px', color: '#6B7280', lineHeight: 1.65, margin: '6px 0 0 0' }}>At Kalibre, we help businesses connect with the right talent through smart recruitment, staffing, outsourcing, and remote workforce solutions. Whether you are hiring for a single role or scaling your entire team.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { icon: <MapPin style={{ width: 16, height: 16, color: '#C1272D' }} />, title: 'Location', content: '408, Colonnade Building, Bopal Ambli Rd, Op, ISKCON BRTS Stand, Ahmedabad, Gujarat 380054.' },
                { icon: <Phone style={{ width: 16, height: 16, color: '#C1272D' }} />, title: 'Contact Number', content: '+91 90999 29045', href: 'tel:+919099929045' },
                { icon: <Mail style={{ width: 16, height: 16, color: '#C1272D' }} />, title: 'Email Address', content: 'bhumika@kalibre.in', href: 'mailto:bhumika@kalibre.in' },
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#FFF0F1', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <h4 style={{ fontWeight: 700, fontSize: '14px', color: '#0A192F', margin: '0 0 4px 0' }}>{item.title}</h4>
                    {item.href ? <a href={item.href} style={{ fontSize: '13.5px', color: '#6B7280', textDecoration: 'none', fontWeight: 500 }}>{item.content}</a> : <p style={{ fontSize: '13.5px', color: '#6B7280', margin: 0, lineHeight: 1.5 }}>{item.content}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ isContactPage = false }) {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log('Subscribed:', email);
    setEmail('');
  };

  const socialLinks = [
    { name: 'Twitter', href: '#', svg: <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg> },
    { name: 'Facebook', href: 'https://www.facebook.com/kalibreglobal/', svg: <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg> },
    { name: 'LinkedIn', href: 'https://in.linkedin.com/company/kalibre-management-services', svg: <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg> },
    { name: 'Instagram', href: 'https://www.instagram.com/kalibreglobal/', svg: <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg> },
  ];

  return (
    <footer className="w-full font-sans text-left">

      {/* ── ORDER BASED ON PAGE ── */}
      {isContactPage ? (
        <>
          <ContactFormSection />
          <TestimonialSection />
          <LeadershipSection />
        </>
      ) : (
        <>
          <TestimonialSection />
          <LeadershipSection />
          <ContactFormSection />
        </>
      )}

      {/* ── BLACK NEWSLETTER BOX ── */}
      <div className="w-full bg-[#2B2A2A] bg-cover bg-center bg-no-repeat px-6 sm:px-12 lg:px-24 py-16 relative" style={{ backgroundImage: `url(${Footerbg})` }}>
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 relative z-10">
          <div className="max-w-xl text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-wide leading-tight mb-4">Transform Your <span className="text-[#E31E24]">Hiring Process</span> Today</h2>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-normal">Partner with Kalibre for innovative recruitment, outsourcing, and workforce management solutions designed to help your business grow with the right talent.</p>
          </div>
          <form onSubmit={handleSubscribe} className="w-full lg:w-auto max-w-md lg:max-w-xl flex-1">
            <div className="bg-white rounded-full p-1.5 pl-6 flex items-center justify-between shadow-md border border-transparent focus-within:border-[#E31E24] transition-all">
              <input type="email" placeholder="Your Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full bg-transparent text-neutral-800 placeholder-neutral-400 focus:outline-none text-sm sm:text-base mr-2" />
              <button type="submit" className="bg-[#E31E24] hover:bg-[#c2181d] text-white font-semibold rounded-full px-6 sm:px-8 py-3 text-xs sm:text-sm tracking-wider uppercase transition-colors duration-300 flex items-center gap-2 shrink-0 shadow">
                Subscribe <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ── BOTTOM SITEMAP ── */}
      <div className="w-full bg-gradient-to-b from-white to-[#FFF0F1] px-6 sm:px-12 lg:px-24 py-16">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 border-b border-neutral-200 pb-12">
            <div className="lg:col-span-4 flex flex-col gap-5">
              <img src={Logo} alt="Kalibre" className="h-10 w-auto object-contain self-start" />
              <p className="text-neutral-600 text-sm leading-relaxed max-w-sm font-normal">Kalibre is a trusted recruitment and workforce solutions company helping businesses hire top talent through smart staffing, outsourcing, payroll, and recruitment services. We connect organizations with skilled professionals to support long-term business growth.</p>
              <div className="flex gap-2.5 mt-1">
                {socialLinks.map((social, idx) => (
                  <a key={idx} href={social.href} aria-label={social.name} className="w-9 h-9 flex items-center justify-center rounded-md border border-neutral-300 bg-white text-neutral-500 hover:text-[#E31E24] hover:border-[#E31E24] transition-all duration-300">{social.svg}</a>
                ))}
              </div>
            </div>
            <div className="lg:col-span-4 grid grid-cols-2 gap-4 text-neutral-700 font-medium text-sm sm:text-base lg:pt-3">

              <div className="flex flex-col gap-4">
                <a href="/" className="hover:text-[#E31E24] transition-colors">Home</a>
                <a href="/about" className="hover:text-[#E31E24] transition-colors">About Us</a>
                <a href="/services" className="hover:text-[#E31E24] transition-colors">Services</a>
                <a href="/industry" className="hover:text-[#E31E24] transition-colors">Industry</a>
                <a href="/process" className="hover:text-[#E31E24] transition-colors">Our Process</a>
                <a href="/clients" className="hover:text-[#E31E24] transition-colors">Clients</a>
                <a href="/contact" className="hover:text-[#E31E24] transition-colors">Contact Us</a>
              </div>

              <div className="flex flex-col gap-4">
                <a href="/talent" className="hover:text-[#E31E24] transition-colors">Talent Acquisition</a>
                <a href="/manpower" className="hover:text-[#E31E24] transition-colors">Manpower Outsourcing</a>
                <a href="/remote-staffing" className="hover:text-[#E31E24] transition-colors">Remote Staffing</a>
                <a href="/rpo" className="hover:text-[#E31E24] transition-colors">Recruitment Process Outsourcing</a>
              </div>

            </div>
            <div className="lg:col-span-4 flex flex-col gap-6 lg:pt-3">
              {[
                { icon: <MapPin className="w-4 h-4" />, title: 'Location', content: '408, Colonnade Building, Bopal Ambli Rd, Op, ISKCON BRTS Stand, Ahmedabad, Gujarat 380054.' },
                { icon: <Phone className="w-4 h-4" />, title: 'Contact Number', content: '+91 90999 29045', href: 'tel:+919099929045' },
                { icon: <Mail className="w-4 h-4" />, title: 'Email Address', content: 'bhumika@kalibre.in', href: 'mailto:bhumika@kalibre.in' },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="w-9 h-9 rounded-full bg-[#FFF0F1] flex items-center justify-center text-[#E31E24] shrink-0">{item.icon}</div>
                  <div>
                    <h4 className="font-bold text-neutral-800 text-sm">{item.title}</h4>
                    {item.href ? <a href={item.href} className="text-neutral-600 text-xs sm:text-sm mt-0.5 hover:text-[#E31E24] transition-colors block">{item.content}</a> : <p className="text-neutral-600 text-xs sm:text-sm mt-1 leading-relaxed">{item.content}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full pt-6 text-center text-xs sm:text-sm text-neutral-500 font-medium">
            Copyright ©{new Date().getFullYear()} Kalibre All Rights Reserved
          </div>
        </div>
      </div>

    </footer>
  );
}

export default Footer;