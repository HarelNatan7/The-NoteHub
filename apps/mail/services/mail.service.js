import { storageService } from "../../../services/async-storage.service.js"
import { utilService } from "../../../services/util.service.js"

console.log('Hi')


export const mailServices = {
    query,
    get,
    put,
    post,
    getFilterCriteria,
    getDefaultSentMail,
}

const MAILS_KEY = 'mailsDB'
const USER_KEY = 'userDB'

const loggedinUser = {
    mail: 'user@NoteHub.com',
    fullname: 'Oren'
}
createEmails()

storageService._save(USER_KEY, loggedinUser)


function createEmails() {
    let mails = utilService.loadFromStorage(MAILS_KEY)
    if (!mails || !mails.length) {
        mails = [
            {
                id: 'e101',
                name: 'nana',
                subject: 'Miss you!',
                body: 'Would adadaf love to catch up sometimes',
                isRead: false,
                isStared: false,
                isChecked: false,
                isTrash: false,
                sentAt: 1551133930594,
                to: 'user@NoteHub.com',
                from: 'nana@nana.com'
            },
            {
                id: 'e102',
                name: 'lala',
                subject: 'Miss mama mama you!',
                body: 'Would masdad love to catch up sometimes',
                isRead: false,
                isStared: false,
                isChecked: false,
                isTrash: false,
                sentAt: 1551133930594,
                to: 'user@NoteHub.com',
                from: 'lala@lala.com'
            },
            {
                id: 'e103',
                name: 'mamam',
                subject: 'Miss lala lala you!',
                body: 'Would  kaka love to catch up sometimes',
                isRead: false,
                isStared: false,
                isChecked: false,
                isTrash: false,
                sentAt: 1551133930594,
                to: 'user@NoteHub.com',
                from: 'mamam@mama.com'
            },
        ]
    }
    utilService.saveToStorage(MAILS_KEY, mails)
}


function put(updatedMail) {

    return storageService.put(MAILS_KEY, updatedMail)
}

function get(mailId) {

    return storageService.get(MAILS_KEY, mailId)
}

function query(criteria = getFilterCriteria()) {

    console.log('criteriaService', criteria);

    return storageService.query(MAILS_KEY).then(mails => {
        // console.log('mails', mails);

        if (criteria.status === 'inbox' && !criteria.txt) {
            const regex = new RegExp(criteria.txt, 'i')
            return mails.filter((mail) => {
                if (mail.from !== loggedinUser.mail) {
                    return mail
                }
            })
        }

        if (criteria.status === 'star' && criteria.isStared) {
            // console.log('filter stars');

            return mails.filter(mail => mail.isStared === criteria.isStared)

        }

        if (criteria.txt) {
            const regex = new RegExp(criteria.txt, 'i')
            mails = mails.filter((mail, idx) => {
                console.log('hii im here too');

                return (regex.test(mail.name) || regex.test(mail.subject) || regex.test(mail.body))
            })
        }

        // console.log('mail', mails);
        // console.log('criteria', criteria);

        return mails
    })

}

function post(mail) {

    return storageService.post(MAILS_KEY, mail)
}


function getDefaultSentMail() {
    const mailSent = {
        name: loggedinUser.fullname,
        subject: '',
        body: '',
        sentAt: Date.now(),
        to: '',
        isRead: false,
        isStared: false,
        isChecked: false,
        isTrash: false,
        from: loggedinUser.mail
    }
    return mailSent
}
function getFilterCriteria() {
    const criteria = {
        status: 'inbox',
        txt: '',
        isRead: true,
        isStared: true,
        lables: ['important', 'romantic']
    }
    return criteria
}