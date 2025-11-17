import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
    form: document.querySelector('.form'),
    delay: document.querySelector('[name=delay]'),
    state: document.querySelector('[name=state]'),
};

refs.form.addEventListener('submit', handleCreateNotification);

function handleCreateNotification(e) {
    e.preventDefault();

    const state = e.target.elements.state.value;
    const delay = e.target.elements.delay.value;

    function createPromise(isPositive, delay) {
        const promise = new Promise((res, rej) => {
            setTimeout(() => {
                if (isPositive === 'fulfilled') {
                    res(`✅ Fulfilled promise in ${delay}ms`);
                } else {
                    rej(`❌ Rejected promise in ${delay}ms`);
                }
            }, delay);
        });
        return promise;
    }

    const promise = createPromise(state, delay);
    promise.then(success => {
        iziToast.success({
            icon: '',
            title: '',
            message: success,
            position: 'topRight',
        });
    });
    promise.catch(error => {
        iziToast.error({
            icon: '',
            title: '',
            message: error,
            position: 'topRight',
        });
    });

    refs.form.reset();
}
