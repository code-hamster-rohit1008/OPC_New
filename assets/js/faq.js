const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.question-wrapper');
    question.addEventListener('click', () => {
        const answer = item.querySelector('.faq-answer');
        const chevron = item.querySelector('i');
        answer.classList.toggle('hidden');
        chevron.classList.toggle('rotate');
    });
});

const faqSectionLinks = document.querySelectorAll('.faq-links');

faqSectionLinks.forEach(link => {
    link.addEventListener('click', () => {
        const id = link.getAttribute('id');
        const item = document.querySelector(`#${id}-faqs`);
        for (const section of document.querySelectorAll('.faqs')) {
            section.classList.add('hidden');
        }
        item.classList.remove('hidden');
    });
});