import {v4 as uuidv4} from 'uuid';

const patients: Patients[] = [
    {
        id: uuidv4(),
        name: 'Luca',
        surname: 'Martinelli',
        age: 33,
        gender: true, // if true male
        phone: 1234566,
        address: 'Lucagatan',
        email: 'luca@luca.it',
    }
];