export default function TextFooter() {
  return (
    <div className="py-12 text-sm text-center text-gray-600 dark:text-gray-400">
      Hak Cipta © {new Date().getFullYear()}. Dibuat dengan ♥ oleh{" "}
      <a
        href="https://www.linkedin.com/in/sarrahman-me"
        target="_blank"
        rel="noopener"
      >
        Sarrahman Digital Creative.
      </a>
    </div>
  );
}
