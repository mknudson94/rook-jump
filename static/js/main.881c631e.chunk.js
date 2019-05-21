(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{107:function(e,t,a){e.exports=a(268)},268:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),r=a(33),s=a.n(r),l=a(17),o=a(18),c=a(20),h=a(19),u=a(21),d=a(55),m=a(11),p=a(26),f=a.n(p);function v(e){return i.a.createElement(f.a,{className:e.classes.square,onClick:e.onClick},e.value)}var b=function(e){function t(){return Object(l.a)(this,t),Object(c.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(o.a)(t,[{key:"renderSquare",value:function(e){var t=this;return i.a.createElement(v,{key:e,value:this.props.squares[e],onClick:function(){return t.props.onClick(e)},classes:this.props.classes})}},{key:"render",value:function(){for(var e=[],t=this.props.classes,a=0;a<this.props.size;a++){for(var n=[],r=0;r<this.props.size;r++){var s=a*this.props.size+r;n.push(this.renderSquare(s))}e.push(i.a.createElement("div",{key:a,styles:{}},n))}return i.a.createElement("div",{className:t.rows},e)}}]),t}(n.Component),y=Object(m.withStyles)({square:{background:"rgba(255, 255, 255, 0)",border:"1px solid #999",borderRadius:0,float:"left",fontSize:"22px",fontWeight:"bold",lineHeight:"34px",height:"34px",width:"34px",minWidth:"34px",marginRight:"-1px",marginTop:"-1px",padding:0,textAlign:"center"},rows:{display:"inline-block"}})(b),g=function(e){function t(){return Object(l.a)(this,t),Object(c.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this.props,t=e.classes,a=e.size,n=[],r=[],s=!0,l=!1,o=void 0;try{for(var c,h=(this.props.path||[])[Symbol.iterator]();!(s=(c=h.next()).done);s=!0){var u=c.value;n.push(33*u.col+16.5),r.push(33*u.row+16.5)}}catch(y){l=!0,o=y}finally{try{s||null==h.return||h.return()}finally{if(l)throw o}}for(var d=[],m=0;m<this.props.path.length-1;m++){var p=n[m+1]-n[m],f=r[m+1]-r[m],v=p/2||10*Math.sign(f),b=f/2||-10*Math.sign(p);d.push(i.a.createElement("path",{key:2*m,d:"M ".concat(n[m]," ").concat(r[m]," Q ").concat(n[m]+v," ").concat(r[m]+b,", ").concat(n[m+1]," ").concat(r[m+1]),stroke:"black",fill:"transparent"})),d.push(i.a.createElement("circle",{key:2*m+1,cx:n[m+1],cy:r[m+1],r:"3",fill:"red"}))}return i.a.createElement("svg",{className:t.overlay,height:33*a,width:33*a},d)}}]),t}(n.Component),E=Object(m.withStyles)({overlay:{}})(g),x=a(96),k=a.n(x),w=a(97),C=a.n(w),j=function(e){function t(){return Object(l.a)(this,t),Object(c.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){for(var e=this,t=this.props.classes,a=[],n=function(n){a.push(i.a.createElement(k.a,{className:t.radioButton,key:n,variant:"contained",size:"small",value:n+1,disabled:e.props.difficulty==n+1,onClick:function(){return e.props.onChange(n)}},n+1))},r=0;r<10;r++)n(r);return i.a.createElement(C.a,{exclusive:!0,value:this.props.i},a)}}]),t}(n.Component),z=Object(m.withStyles)({radioButton:{minWidth:40}})(j);function O(e){return Math.round(Math.random()*Math.floor(e))}function S(e,t){return{row:Math.floor(e/t),col:e%t}}function M(e,t,a){return{board:e,size:t,difficulty:a,fitness:arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,solution:arguments.length>4&&void 0!==arguments[4]?arguments[4]:null}}function q(e,t,a){var n=e.board,i=e.size,r=(a-t)%i===0,s=Math.floor(a/i)===Math.floor(t/i),l=Math.abs(a-t)===n[t],o=Math.abs(Math.floor(a/i)-Math.floor(t/i))===n[t];return s&&l||r&&o}function D(e){var t,a=0,n=[],i=[],r=e.board.length-1,s={0:[0]};for(n.push(0);0!==n.length;){t=n.shift(),i.push(t);for(var l=[],o=0;o<e.board.length;o++)q(e,t,o)&&l.push(o);for(var c=0,h=l;c<h.length;c++){var u=h[c];u===r&&(a=1),i.includes(u)||n.includes(u)||(n.push(u),s[u]=s[t].concat(u))}}return s.hasOwnProperty(r)&&(a*=s[r].length/e.difficulty),M(e.board,e.size,e.difficulty,a,s[r])}function N(e){var t=e.board.slice();return t[O(t.length-2)]=t[O(t.length-2)],D(M(t,e.size,e.difficulty))}function P(e,t){for(var a=Array(Math.pow(e,2)).fill(null),n=0;n<Math.pow(e,2);n++){var i=S(n,e),r=Math.max(Math.abs(i.row-Math.floor(e/2)),Math.abs(i.col-Math.floor(e/2)))+Math.floor(e/2);a[n]=O(r-1)+1}return a[a.length-1]=0,D(M(a,e,t))}var T=function(e){for(var t=30+10*e,a=Math.floor((e-1)/3)+4,n=P(a,e),i=0;;i++){var r=N(n);if(r.fitness>n.fitness&&(n=r),n.fitness>1){var s=function(){var e=[];return n.solution.forEach(function(t){return e.push(S(t,n.size))}),n.solution=e,n.iterations=i+1,console.log(n),{v:n}}();if("object"===typeof s)return s.v}else i%t===0&&(n=P(a,e))}},A=a(42),B=a.n(A),I=a(9),R=a.n(I),W=a(103),F=a.n(W),U=a(34),G=a.n(U),H=a(100),J=a.n(H),L=a(56),Q=a.n(L),V=a(102),Y=a.n(V),K=a(101),X=a.n(K),Z=a(105),$=a.n(Z),_=a(104),ee=a.n(_),te=a(57),ae=a.n(te),ne=a(58),ie=a.n(ne),re=a(98),se=a.n(re),le=(a(192),a(99));function oe(e){return i.a.createElement(se.a,{style:{"first-child":{visibility:"hidden"}},value:e.i,format:"(ddd)"})}var ce=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(c.a)(this,Object(h.a)(t).call(this,e))).handleExpandClick=function(){a.setState(function(e){return{expanded:!e.expanded}})},a.state={boardData:T(e.difficulty),activeSquare:0,userPath:[{row:0,col:0}],history:[],reveal:!1,expanded:!1,bounce:!1},a}return Object(u.a)(t,e),Object(o.a)(t,[{key:"componentDidUpdate",value:function(e,t){var a=this;e.difficulty!==this.props.difficulty&&(console.log("updating board"),this.setState({activeSquare:0,boardData:T(this.props.difficulty),userPath:[{row:0,col:0}],reveal:!1}));var n=Math.pow(this.state.boardData.size,2)-1;console.log(this.state.activeSquare,n,t.activeSquare,n),this.state.activeSquare===n&&t.activeSquare!==n&&this.state.userPath.length>this.state.boardData.solution.length&&(console.log("bouncing!"),this.setState({bounce:!0}),this.forceUpdate(function(){setTimeout(function(){a.setState({bounce:!1})},1e3)}))}},{key:"isSuccessor",value:function(e){var t=this.state.activeSquare,a=this.state.boardData.board,n=(e-t)%this.state.boardData.size===0,i=Math.floor(e/this.state.boardData.size)===Math.floor(t/this.state.boardData.size),r=Math.abs(e-t)===a[t],s=Math.abs(Math.floor(e/this.state.boardData.size)-Math.floor(t/this.state.boardData.size))===a[t];return i&&r||n&&s}},{key:"handleClick",value:function(e){if(this.isSuccessor(e)){var t=this.state.history.slice();t.push({activeSquare:this.state.activeSquare,userPath:this.state.userPath});var a=S(e,this.state.boardData.size),n=this.state.userPath.concat(a);this.setState({activeSquare:e,userPath:n,history:t})}}},{key:"handleSolveClick",value:function(){this.setState({reveal:!this.state.reveal})}},{key:"handleUndo",value:function(){if(0!==this.state.history.length){var e=this.state.history,t=e.pop();this.setState({activeSquare:t.activeSquare,userPath:t.userPath,history:e})}}},{key:"handleReset",value:function(){this.setState({activeSquare:0,userPath:[{row:0,col:0}],reveal:!1})}},{key:"render",value:function(){var e=this,t=this.props.classes,a=Math.pow(this.state.boardData.size,2)-1,n=S(this.state.activeSquare,this.state.boardData.size),r=this.state.activeSquare===a?this.state.userPath.length===this.state.boardData.solution.length?i.a.createElement(i.a.Fragment,null,"You win!"):i.a.createElement(i.a.Fragment,null,"Good job! ",i.a.createElement("br",null),"But that's not the shortest solution..."):i.a.createElement(i.a.Fragment,null,"Active square: (".concat(n.row,", ").concat(n.col,")"));return i.a.createElement(J.a,{className:t.containerCard},i.a.createElement(Q.a,null,i.a.createElement(B.a,{container:!0,spacing:0,styles:{justifyContent:"center"}},i.a.createElement(B.a,{item:!0,xs:12,sm:6,className:t.boardAndOverlayContainer},i.a.createElement("div",{className:t.overlayContainer},i.a.createElement("div",{className:t.overlay},i.a.createElement(E,{size:this.state.boardData.size,path:this.state.reveal?this.state.boardData.solution:this.state.userPath})),i.a.createElement("div",{style:{visibility:"hidden",display:"inline-block"}},i.a.createElement(G.a,{size:"small",className:t.actionButton},i.a.createElement(ae.a,null)),i.a.createElement(G.a,{size:"small",className:t.actionButton},i.a.createElement(ie.a,null)))),i.a.createElement(y,{className:t.board,squares:this.state.boardData.board,difficulty:this.props.difficulty,size:this.state.boardData.size,onClick:function(t){return e.handleClick(t)}}),i.a.createElement("div",null,i.a.createElement(G.a,{className:t.actionButton,size:"small",color:"primary",onClick:function(){return e.handleUndo()}},i.a.createElement(ae.a,null)),i.a.createElement(le.Animated,{animationOut:"bounce",animationOutDelay:300,isVisible:!this.state.bounce,animationInDuration:0},i.a.createElement(G.a,{className:t.actionButton,size:"small",color:"secondary",onClick:function(){return e.handleReset()}},i.a.createElement(ie.a,null))))),i.a.createElement(B.a,{item:!0,xs:12,sm:5,className:t.secondaryPanel},i.a.createElement(R.a,{container:"div",variant:"caption"},"Maze successfully generated after ",i.a.createElement(oe,{i:this.state.boardData.iterations,classes:t})," iterations."),i.a.createElement("div",{className:t.gameMessageContainer},i.a.createElement(R.a,{variant:"subtitle2"},r)),i.a.createElement(X.a,{style:{margin:"16px 0"}}),i.a.createElement("div",null,i.a.createElement(f.a,{className:t.revealButton,variant:this.state.reveal?"outlined":"contained",color:"inherit",size:"small",onClick:function(){return e.handleSolveClick()}},"Reveal solution"))))),i.a.createElement(Y.a,{className:t.actions,disableActionSpacing:!0},i.a.createElement(R.a,{variant:"caption",style:{marginLeft:"auto",cursor:"pointer"},onClick:this.handleExpandClick},"Change difficulty"),i.a.createElement(F.a,{className:this.state.expanded?t.expandOpen:t.expand,onClick:this.handleExpandClick,"aria-expanded":this.state.expanded,"aria-label":"Show more"},i.a.createElement(ee.a,null))),i.a.createElement($.a,{in:this.state.expanded,className:t.collapseContainer},i.a.createElement(Q.a,{style:{textAlign:"right"}},i.a.createElement(z,{difficulty:this.props.difficulty,onChange:this.props.handleRadioChange}))))}}]),t}(i.a.Component),he=Object(m.withStyles)(function(e){var t;return{containerCard:{maxWidth:620,margin:"auto",padding:10},cardContent:{display:"flex",justifyContent:"space-around",alignItems:"center"},boardAndOverlayContainer:{position:"relative",height:256,minWidth:256,display:"flex",alignItems:"center",justifyContent:"center"},board:{},overlayContainer:{position:"absolute"},overlay:{display:"inline-block",verticalAlign:"middle"},secondaryPanel:(t={display:"flex",flexDirection:"column",justifyContent:"space-around",textAlign:"center"},Object(d.a)(t,e.breakpoints.down("xs"),{margin:"0 20px"}),Object(d.a)(t,e.breakpoints.up("sm"),{margin:"20px 0"}),t),gameMessageContainer:{height:65,display:"flex",flexDirection:"column",justifyContent:"center"},actionButton:{display:"block",margin:"20px 10px",color:"white"},expand:{transform:"rotate(0deg)",transition:e.transitions.create("transform",{duration:e.transitions.duration.shortest})},expandOpen:{transform:"rotate(180deg)"},collapseContainer:{}}})(ce),ue=a(54),de=a.n(ue),me=a(106),pe=a.n(me),fe=a(59),ve=a.n(fe),be=Object(m.createMuiTheme)({breakpoints:{values:{xs:0,sm:685,md:960,lg:1280,xl:1920}}}),ye=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(c.a)(this,Object(h.a)(t).call(this,e))).handleOptionChange=function(e){var t=e+1;console.log("".concat(t," has been selected!")),a.setState({difficulty:t}),a.forceUpdate()},a.state={difficulty:5},a}return Object(u.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this.props.classes;return i.a.createElement(i.a.Fragment,null,i.a.createElement(m.MuiThemeProvider,{theme:be},i.a.createElement(de.a,{className:e.gameContainer},i.a.createElement("div",null,i.a.createElement(he,{difficulty:this.state.difficulty,handleRadioChange:this.handleOptionChange})),i.a.createElement("div",{className:e.textContainer},i.a.createElement(R.a,{variant:"h6"},"How To Play"),i.a.createElement(R.a,{paragraph:!0},'Starting at the square in the upper-left corner, find a path to the "0" square in the bottom-right corner.  From each numbered square, you can move that exact number of squares horizontally or vertically.  What\'s the shortest path you can find?'),i.a.createElement(R.a,{variant:"h6"},"Generating the Maze"),i.a.createElement(R.a,{paragraph:!0},"Initially, the maze is just a randomly generated grid of numbers, not guaranteed to be easy, challenging, or even solvable! The final maze (displayed now) is generated by an artificial intelligence algorithm known as ",i.a.createElement("strong",null,i.a.createElement("em",null,"hill climbing")),'. One non-goal square is randomly changed, and the new maze is evaluated. If it is better, it replaces the old maze. Thus, the maze climbs "uphill." This repeats until a new maze meets a certain "goodness" threshold. This evaluation is done by an ',i.a.createElement("strong",null,i.a.createElement("em",null,"objective function")),"."),i.a.createElement(R.a,{variant:"h6"},"The Objective Function"),i.a.createElement(R.a,{paragraph:!0},'The greatest creative work on this project is in defining the objective function, which takes a maze, and returns a number representing the "goodness" of the maze. The current implementation of the objective function currently only weighs solvability and shortest-solution length, which is discovered by a simple ',i.a.createElement("strong",null,i.a.createElement("em",null,"breadth-first search")),"."),i.a.createElement(R.a,{variant:"h6"},"Optimizations"),i.a.createElement(R.a,{paragraph:!0},"This project includes a few optimizations to classical algorithms, and could be expanded to include several more.",i.a.createElement(pe.a,null,i.a.createElement(ve.a,null,i.a.createElement(R.a,null,i.a.createElement(R.a,{variant:"subtitle2",inline:!0},"Initial generation"),' \xa0Opposed to truly random values in each square, the maze is initially seeded with only squares from which there exists a legal move. This drastically reduces the number of "black holes," or dead ends from which the player can\'t continue. That in turn increases the chance that a maze is solvable and increases the branching factor at each step, which increases complexity.')),i.a.createElement(ve.a,null,i.a.createElement(R.a,null,i.a.createElement(R.a,{variant:"subtitle2",inline:!0},"Random restart")," \xa0Random-restart hill climbing adopts the well-known adage, \"If at first you don't succeed, try, try again.\" If the goodness of the maze hasn't passed the threshold after a certain number of iterations of the hill-climbing algorithm, the process restarts with a new initial maze."))))))))}}]),t}(i.a.Component),ge=Object(m.withStyles)({gameContainer:{paddingTop:"20px"},textContainer:{padding:26,maxWidth:600,margin:"auto"}})(ye);s.a.render(i.a.createElement(ge,null),document.getElementById("root"))}},[[107,1,2]]]);
//# sourceMappingURL=main.881c631e.chunk.js.map