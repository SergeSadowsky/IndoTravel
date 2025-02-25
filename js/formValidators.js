export const bookingFormValidator = (form, cb) => {
    const validator = new JustValidate(form,
        {
            errorLabelStyle: {
                color: 'red',
            },
            errorLabelCssClass: 'reservation__input__error'
        }
    );
    validator
        .addField(reservation__name, [
            {
                rule: 'required',
                errorMessage: 'Укажите фамилию, имя, отчество'
            },
            {
                rule: 'customRegexp',
                value: /([А-яа-я]+)([\u0020][А-яа-я]+){2,}/,
                errorMessage: 'Укажите фамилию, имя, отчество полностью'
            },
         ])
        .addField(reservation__phone, [
            {
                rule: 'required',
                errorMessage: 'Введите номер телефона',
            },
            {
                rule: 'custom',
                validator: () => reservation__phone.value.replace(/\D/g, "").length === 11,
                errorMessage: 'Указан некорректный номер телефона',
            },
        ])
        .onSuccess((e) => {
            cb(e);
        });

    setValidationOnBlur(validator);
}


export const footerFormValidator = (form, cb) => {
    const validator = new JustValidate(form,
        {
            errorLabelStyle: {
                color: 'red',
            },
            errorLabelCssClass: 'footer__input__error'
        }
    );
    validator
        .addField(form.footer__email, [
            {
                rule: 'required',
                errorMessage: 'Адрес не указан'
            },
            {
                rule: 'email',
                errorMessage: 'Указан некорректный адрес'
            },
        ])
        .onSuccess((e) => {
            cb(e);
        });
    setValidationOnBlur(validator);
}

const setValidationOnBlur = (validator) => {
    Object.values(validator.fields).map(field => {
        field.elem.addEventListener('blur', () => {
            validator.revalidateField(field.elem);
        });
    });
}
