document.addEventListener('DOMContentLoaded', () => {
  // ===== Scroll reveal for sections =====
  const revealElements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target); // reveal only once
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  revealElements.forEach(el => observer.observe(el));

  // ===== Smooth scrolling for in-page links (future nav-ready) =====
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  internalLinks.forEach(link => {
    link.addEventListener('click', event => {
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        event.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ===== Scroll spy for top navigation =====
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.top-nav-links a[href^="#"]');

  const idToLink = {};
  navLinks.forEach(link => {
    const id = link.getAttribute('href').slice(1);
    idToLink[id] = link;
  });

  const sectionObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          // Remove active from all
          navLinks.forEach(link => link.classList.remove('active'));
          // Add active to the one matching the current section
          const activeLink = idToLink[id];
          if (activeLink) {
            activeLink.classList.add('active');
          }
        }
      });
    },
    {
      threshold: 0.4
    }
  );

  sections.forEach(section => sectionObserver.observe(section));


  // ===== Back-to-top button logic =====
  const backToTopBtn = document.querySelector('.back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
