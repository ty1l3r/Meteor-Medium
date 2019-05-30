T9n.setLanguage('fr');
//Fonction T9n gère la langue (deja présente dans un package)

let email = AccountsTemplates.removeField('email');
let password = AccountsTemplates.removeField('password');

AccountsTemplates.configure({
    // Behavior
    enablePasswordChange: true,
     // Appearance
    showForgotPasswordLink: true,
      // Privacy Policy and Terms of Use
    privacyUrl: 'privacy',
});

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
    displayName: 'Prénom',
    placeholder: 'Prénom',
    required: true,
    minLenght: 3,
    trim: true
});

AccountsTemplates.addField({
    _id: 'name',
    type: 'text',
    displayName: 'Nom',
    placeholder: 'Nom',
    required: true,
    minLenght: 3,
    trim: true
});

password.minLenght = 6;


AccountsTemplates.addField(email);


AccountsTemplates.addField(password);
