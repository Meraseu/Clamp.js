# Clamp

멀티 말줄임 자바스크립트 라이브러리

## Usage

Html
```
<div class="clamp nowrap">
	<div class="content">직장인 10명 중 9명이 직장생활 사춘기, 즉 직춘기를 겪은 경험이 있는 것으로 나타났다. 특히 이 중 7명은 현재 직춘기를 겪고 있다고 답했다. 잡코리아가 직장인 744명을 대상으로 ‘직춘기’를 주제로 설문조사를 실시한 결과 이같이 나타났다고 밝혔다.</div>
</div>
```
Css
```
.clamp {position:relative; width:100px; height:100px; overflow:hidden;}
.clamp.nowrap {overflow:hidden; overflow-y:auto; height:100px;}
.content {overflow:hidden; position:relative; width:100%; font-size:12px; color:#000;}
.content.blind {position:absolute; left:-100%; top:-100%; opacity:0;}
.backdrop {width:100%; height:100px; background-color:#fff; font-size:12px; color:#000;}
```
Javascript
```
const clamp = new Clamp(document.querySelector('.clamp'), {
	added: '...'
});
```