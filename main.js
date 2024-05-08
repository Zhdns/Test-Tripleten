const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const studentSource = 'sandbox/student.html'
const authorSource = 'sandbox/author.html'
const stepOne = [
    '*Hi, my name is  Denis*',
    '--- Student HTML ---',

]
const stepTwo = [
    '---- Author HTML ----',
]
const  stepThree = [
    '<<<<Thank You>>>>'
]


const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

const clicker = async (step) => {
    for (let i = 0; i < step.length; i++) {
        console.log(step[i])
        await delay(2000)
    }
}

const tagChecker = async (source) => {
    try {
        const dom = await JSDOM.fromFile(source);
        const document = dom.window.document;
        const aTag = document.querySelector('a');
        
        if (aTag && aTag.getAttribute('target') === '_blank') {
            console.log('Congratulations, test is passed');
            await delay(2000)
        } else {
            console.log('Need to add target="_blank"');
            await delay(2000)
        }
    } catch (error) {
        console.error('Error loading the HTML file:', error);
    }
};


const runTest = async () => {
   await clicker(stepOne)
   await tagChecker(studentSource)
   await clicker(stepTwo)
   await tagChecker(authorSource)
   await clicker(stepThree)
}

runTest()

