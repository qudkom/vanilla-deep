https://news.naver.com/main/list.naver?mode=LPOD&mid=sec&sid1=001&sid2=140&oid=001&isYeonhapFlash=Y

const articles = Array.from(document.querySelectorAll('ul.type02>li')).map((li) => {
  const aTag = li.querySelector('a');
  const title = aTag?.innerText.trim();
  const link = aTag?.href;
  return { title, link };
}).filter(item => item.title);

articles[Symbol.asyncIterator] = async function* (){
  const size = 2
  let i = 0
  while(i<this.length){
      yield this.slice(i, i+size)
      await new Promise((res)=>setTimeout(res, 1000))
      i+=size
  }
}

for await (const item of articles){
  console.log(item)
}