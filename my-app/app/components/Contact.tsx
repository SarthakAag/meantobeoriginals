"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    business: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors = {
      name: "",
      email: "",
      message: "",
    };

    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email";
      isValid = false;
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
        formData.email
      )
    ) {
      newErrors.email = "Invalid email address";
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please enter your message";
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    console.log(formData);

    setSuccess(true);

    setFormData({
      name: "",
      email: "",
      business: "",
      message: "",
    });

    setTimeout(() => {
      setSuccess(false);
    }, 4000);
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden px-6 py-28 lg:px-12"
    >
      {/* Background */}
      <div className="absolute left-[-100px] top-[120px] h-[300px] w-[300px] rounded-full bg-red-100/60 blur-3xl" />

      <div className="absolute bottom-[-100px] right-[-100px] h-[280px] w-[280px] rounded-full bg-orange-100/70 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl overflow-hidden rounded-[3rem] border border-[#e8dfd5] bg-white/70 shadow-[0_20px_80px_rgba(0,0,0,0.06)] backdrop-blur-xl">
        <div className="grid lg:grid-cols-2">
          {/* LEFT */}
          <div className="relative overflow-hidden bg-[#b11212] p-10 text-white md:p-14">
            <div className="absolute right-[-100px] top-[-100px] h-[260px] w-[260px] rounded-full bg-red-400/20 blur-3xl" />

            <div className="relative z-10">
              <p className="text-sm uppercase tracking-[0.35em] text-red-100">
                Ready To Grow?
              </p>

              <h2 className="mt-6 font-serif text-5xl font-black leading-tight">
                Let’s Build Something Extraordinary
              </h2>

              <p className="mt-8 max-w-lg text-lg leading-8 text-red-50/90">
                Book a free strategy call and discover how we can scale your
                brand through high-converting digital experiences.
              </p>

              {/* Contact Info */}
              <div className="mt-12 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
                    <Mail size={24} />
                  </div>

                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-red-100">
                      Email
                    </p>

                    <p className="mt-1 text-lg font-medium">
                      meanttobe.originals@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
                    <Phone size={24} />
                  </div>

                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-red-100">
                      Phone
                    </p>

                    <p className="mt-1 text-lg font-medium">
                      +91 8217872439
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="bg-[#fcfaf7] p-10 md:p-14">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#a31414]">
                Contact Form
              </p>

              <h3 className="mt-5 text-4xl font-black leading-tight text-black">
                Start Your Growth Journey
              </h3>
            </div>

            {/* Success */}
            {success && (
              <div className="mt-8 flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 px-5 py-4 text-green-700">
                <CheckCircle2 size={22} />

                <span className="font-medium">
                  Message sent successfully!
                </span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-10 space-y-6">
              {/* Name */}
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                  className="w-full rounded-2xl border border-[#e4dacf] bg-white px-6 py-5 text-black outline-none transition focus:border-[#b11212]"
                />

                {errors.name && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                  className="w-full rounded-2xl border border-[#e4dacf] bg-white px-6 py-5 text-black outline-none transition focus:border-[#b11212]"
                />

                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Business */}
              <div>
                <input
                  type="text"
                  placeholder="Business / Brand"
                  value={formData.business}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      business: e.target.value,
                    })
                  }
                  className="w-full rounded-2xl border border-[#e4dacf] bg-white px-6 py-5 text-black outline-none transition focus:border-[#b11212]"
                />
              </div>

              {/* Message */}
              <div>
                <textarea
                  rows={5}
                  placeholder="Tell us about your project..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      message: e.target.value,
                    })
                  }
                  className="w-full resize-none rounded-2xl border border-[#e4dacf] bg-white px-6 py-5 text-black outline-none transition focus:border-[#b11212]"
                />

                {errors.message && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Button */}
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#b11212] px-8 py-5 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:scale-[1.02] hover:bg-[#921010]"
              >
                Send Message
                <ArrowUpRight size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}