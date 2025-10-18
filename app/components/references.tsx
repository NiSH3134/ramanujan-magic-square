
import React, { forwardRef } from 'react';

type ReferenceProps = {
  // optional: you can pass a callback if needed
};

const References = forwardRef<HTMLElement, ReferenceProps>((props, ref) => {
  const resources = [
    {
      title: "Ramanujan's Magic Square Explained",
      link: "https://en.wikipedia.org/wiki/Magic_square#Ramanujan",
    },
    {
      title: "Understanding 4x4 Magic Squares",
      link: "https://www.mathsisfun.com/numbers/magic-square.html",
    },
    {
      title: "Srinivasa Ramanujan Biography",
      link: "https://www.britannica.com/biography/Srinivasa-Ramanujan",
    },
  ];


  return (
    <section
      ref={ref}
      id="references"
      className="w-full py-16 px-4 md:px-0 flex flex-col items-center gap-8 bg-[var(--color-primary)]"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-secondary)] text-center">
        References & Resources
      </h2>

      {/* Resource Links */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full max-w-5xl justify-center flex-wrap">
        {resources.map((res, idx) => (
          <a
            key={idx}
            href={res.link}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-3 bg-[var(--color-secondary)] text-[var(--color-primary)] rounded-lg shadow-[var(--shadow)] hover:bg-[var(--color-accent)] hover:text-[var(--color-primary)] transition-colors w-full md:w-60 text-center"
          >
            {res.title}
          </a>
        ))}
      </div>

      {/* YouTube Video Embed */}
      <div className="w-full max-w-3xl aspect-video shadow-[var(--shadow)] rounded-lg overflow-hidden">
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/1GTYYF-xXi0"
          title="Birthday Mystery using Magic Square | Srinivasa Ramanujan"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>

      {/* Calculation Logic */}
      <div className=' max-w-3xl p-8 rounded-2xl bg-[var(--color-secondary)] text-[var(--color-primary)]' style={{
      }}>
        <h2 style={{
          fontSize: '1.4rem',
          fontWeight: '600',
          marginBottom: '1.1rem',
          letterSpacing: '0.01em'
        }}>
          Calculation Logic
        </h2>
        <ul style={{
          listStyle: 'decimal inside',
          fontSize: '1.08rem',
          lineHeight: '1.7',
          paddingLeft: 0
        }}>
          <li style={{ marginBottom: "0.9em" }}>
            <strong>Extract DOB components:</strong> Take the day, month, and year of birth.<br />
            Denote them as <strong>A</strong> (day), <strong>B</strong> (month), <strong>C</strong> (century part of year), <strong>D</strong> (year part of year).<br />
            Example: 04-09-2024 → A = 4, B = 9, C = 20, D = 24.
          </li>
          <li style={{ marginBottom: "0.9em" }}>
            <strong>Prepare the 4×4 magic square structure:</strong><br />
            Arrange placeholders as:
            <table className="w-full border border-slate-300 rounded-lg my-6">
              <tbody>
                <tr>
                  <td className="border border-slate-300 px-4 py-2 text-center font-medium">A</td>
                  <td className="border border-slate-300 px-4 py-2 text-center font-medium">B</td>
                  <td className="border border-slate-300 px-4 py-2 text-center font-medium">C</td>
                  <td className="border border-slate-300 px-4 py-2 text-center font-medium">D</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-4 py-2 text-center">D + 1</td>
                  <td className="border border-slate-300 px-4 py-2 text-center">C − 1</td>
                  <td className="border border-slate-300 px-4 py-2 text-center">B − 3</td>
                  <td className="border border-slate-300 px-4 py-2 text-center">A + 3</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-4 py-2 text-center">B − 2</td>
                  <td className="border border-slate-300 px-4 py-2 text-center">A + 2</td>
                  <td className="border border-slate-300 px-4 py-2 text-center">D + 2</td>
                  <td className="border border-slate-300 px-4 py-2 text-center">C − 2</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-4 py-2 text-center">C + 1</td>
                  <td className="border border-slate-300 px-4 py-2 text-center">D − 1</td>
                  <td className="border border-slate-300 px-4 py-2 text-center">A + 1</td>
                  <td className="border border-slate-300 px-4 py-2 text-center">B − 1</td>
                </tr>
              </tbody>
            </table>

          </li>
          <li style={{ marginBottom: "0.9em" }}>
            <strong>Compute each cell value:</strong> Replace the placeholders above using the DOB numbers and arithmetic.<br />
            Example: D + 1 = 24 + 1 = 25, B − 3 = 9 − 3 = 6.
          </li>
          <li style={{ marginBottom: "0.9em" }}>
            <strong>Validate the magic square:</strong> Ensure each row, column, and diagonal equals the magic constant.
          </li>
          <li style={{ marginBottom: "0.9em" }}>
            <strong>Magic constant formula:</strong> Magic Constant = A + B + C + D
          </li>
        </ul>
      </div>

    </section>
  );
});



export default References;