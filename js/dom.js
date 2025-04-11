export function toggleActiveBtn(btn) {
    if (!btn.classList.contains('btn')) return false;
    if (!btn.classList.contains('active-btn'))btn.classList.add('active-btn');
    else btn.classList.remove('active-btn');
}

