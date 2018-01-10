/*
Дан текст, найти количество  слов в тексте
которые являются составной частью других слов,
например  “он шел и пришел  в  домой до 10 часов.”
В тексте 4 слова: в шел и до
 */

function countWords(text) {
    let wordsArr = text.split(" ");
    let pos = 0;
    let count = 0;
    let index = 0;
    let resultWords = [];
    while (true) {
        pos = text.indexOf(wordsArr[index], pos);
        if (index === wordsArr.length - 1) break;
        else if (pos === -1 || !wordsArr[index]) {
            index++;
            pos = 0;
            count = 0;
            continue;
        }
        else if (pos >= 0) {
            ++count;
        }
        if (count === 2 && (resultWords.indexOf(wordsArr[index]) === -1)) {
            resultWords.push(wordsArr[index]);
        }
        pos += 1;
    }
    return resultWords.length;
}

console.log(`Task 4 - >
${countWords(`Дан текст, найти количество  слов в тексте которые являются составной 
частью других слов, например  “он шел и пришел  в  домой до 10 часов.” 
В тексте 4 слова: в шел и до`)}`);