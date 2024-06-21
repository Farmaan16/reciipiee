function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-black p-6 flex items-center justify-center">
      <p className="text-white text-sm md:text-lg">
        &copy;{year} RecipeHub. All Rights Reserved.
      </p>
    </footer>
  );
}

export default Footer;
