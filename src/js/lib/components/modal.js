import $ from '../core';

$.prototype.modal = function (created) {
    const scroll = calcScroll();
    let dur = 500;

    for (let i = 0; i < this.length; i++) {
        const target = this[i].getAttribute('data-target');
        $(this[i]).click((e) => {
            e.preventDefault();
            $(target).fadeIn(dur);
            document.body.style.overflow = 'hidden';
            document.body.style.marginRight = `${scroll}px`;
        });

        const closeElement = document.querySelectorAll(`${target} [data-close]`);
        closeElement.forEach((elem) => {
            $(elem).click(() => {
                $(target).fadeOut(dur);
                if (created) {
                    document.querySelector(target).remove();
                }
                setTimeout(() => {
                    document.body.style.marginRight = `0px`;
                    document.body.style.overflow = '';
                }, dur);
            });
        });

        $(target).click((e) => {
            if (e.target.classList.contains('modal')) {
                $(target).fadeOut(dur);
                if (created) {
                    document.querySelector(target).remove();
                }
                setTimeout(() => {
                    document.body.style.marginRight = `0px`;
                    document.body.style.overflow = '';
                }, dur);
            }
        });
    }
};

$('[data-toggle="modal"]').modal();


function calcScroll() {
    let div = document.createElement('div');

    div.style.width = '50px';
    div.style.height = '50px';
    div.style.overflowY = 'scroll';
    div.style.visibility = 'hidden';

    document.body.appendChild(div);

    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();

    return scrollWidth;
}

$.prototype.createModal = function ({
    txtTitle,
    txtBody,
    btnCount,
    btnSettings
} = {}) {
    for (let i = 0; i < this.length; i++) {
        let modal = document.createElement('div');
        modal.classList.add('modal');
        modal.setAttribute('id', this[i].getAttribute('data-target').slice(1));

        const buttons = [];

        // btns = {count: num, settings: [[text, classNames=[], close, cb]]}

        for (let j = 0; j < btnCount; j++) {
            let btn = document.createElement('button');
            btn.classList.add('btn', ...btnSettings[j][1]);
            btn.textContent = btnSettings[j][0];
            if (btnSettings[j][2]) {
                btn.setAttribute('data-close', 'true');
            }

            if (btnSettings[j][3] && typeof (btnSettings[j][3]) === 'function') {
                btn.addEventListener('click', btnSettings[j][3]);
            }

            buttons.push(btn);
        }

        modal.innerHTML = `
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${txtTitle}</h5>
                        <button class="btn-close" data-close></button>
                    </div>
                    <div class="modal-body">
                        ${txtBody}
                    </div>
                    <div class="modal-footer">
                        
                    </div>
                </div>
            </div>
        `;

        modal.querySelector('.modal-footer').append(...buttons);
        document.body.append(modal);
        $(this[i]).modal(true);
        $(this[i].getAttribute('data-target')).fadeIn(500);
    }
};