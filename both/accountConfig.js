T9n.setLanguage('fr');
//Fonction T9n gère la langue (deja présente dans un package)

let email = AccountsTemplates.removeField('email');
let password = AccountsTemplates.removeField('password');

AccountsTemplates.addField({
    _id: 'pseudo',
    type: 'text',
    displayName: 'Pseudo',
    placeholder: 'Pseudo',
    required: true,
    minLenght: 3,
    trim: true
});

AccountsTemplates.addField({
    _id: 'firstname',
    type: 'text',
    displayName: 'Firstname',
    placeholder: 'Firstname',
    required: true,
    minLenght: 3,
    trim: true
});

AccountsTemplates.addField({
    _id: 'name',
    type: 'text',
    displayName: 'Name',
    placeholder: 'Name',
    required: true,
    minLenght: 3,
    trim: true
});

password.minLenght = 3;

AccountsTemplates.addField(email);
AccountsTemplates.addField(password);
