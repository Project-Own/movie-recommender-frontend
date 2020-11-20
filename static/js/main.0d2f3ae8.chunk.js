(this["webpackJsonpux-design"]=this["webpackJsonpux-design"]||[]).push([[0],{120:function(e,t,a){e.exports=a(149)},149:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),o=a(11),i=a.n(o);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var l=a(206),p=a(37),c=a(12),m=a(183),s=a(184),g=a(106),h=a(68),d={light:Object(g.a)({palette:{type:"light",primary:{main:"#556cd6"},secondary:{main:"#cc4444"},error:{main:h.a.A400},background:{default:"#f5f5f5"},titleBar:{main:"#eeeeee",contrastText:"#222222"}}}),dark:Object(g.a)({palette:{type:"dark",primary:{main:"#26292C",light:"rgb(81, 91, 95)",dark:"rgb(26, 35, 39)",contrastText:"#ffffff"},secondary:{main:"#FFB74D",light:"rgb(255, 197, 112)",dark:"rgb(200, 147, 89)",contrastText:"rgba(0, 0, 0, 0.87)"},titleBar:{main:"#555555",contrastText:"#ffffff"},error:{main:h.a.A400}}})};var u=Object(r.createContext)({currentTheme:"light",setTheme:null}),j=function(e){var t,a=e.children,o=Object(m.a)("(prefers-color-scheme: dark)");Object(r.useMemo)((function(){return t=o?"dark":"light"}),[o]),t=localStorage.getItem("appTheme")||t;var i=Object(r.useState)(t),l=Object(c.a)(i,2),p=l[0],g=l[1];console.log("Theme name: "+p);var h=function(e){return d[e]}(p),j={currentTheme:p,setTheme:function(e){localStorage.setItem("appTheme",e),g(e)}};return n.a.createElement(u.Provider,{value:j},n.a.createElement(s.a,{theme:h},a))},b=a(67),f=Object(b.b)({name:"snackbar",initialState:{snackbarOpen:!1,snackbarType:"success",snackbarMessage:""},reducers:{setSnackbar:function(e,t){console.log("Action",t.payload);var a=t.payload,r=a.snackbarOpen,n=a.snackbarMessage,o=a.snackbarType;e.snackbarMessage=n,e.snackbarOpen=r,e.snackbarType=o}}}),E=f.actions.setSnackbar,y=f.reducer,w=Object(b.a)({reducer:{snackbar:y}}),v=a(185),M=a(211),k=a(210),N=Object(v.a)((function(e){return{root:{width:"100%","& > * + *":{marginTop:e.spacing(2)}}}})),T=function(){var e=N(),t=Object(p.b)(),a=Object(p.c)((function(e){return e.snackbar.snackbarOpen})),r=Object(p.c)((function(e){return e.snackbar.snackbarType})),o=Object(p.c)((function(e){return e.snackbar.snackbarMessage})),i=function(e,a){"clickaway"!==a&&t(E(!1,r,o))};return n.a.createElement("div",{className:e.root},n.a.createElement(M.a,{open:a,autoHideDuration:3e3,onClose:i},n.a.createElement(k.a,{elevation:6,variant:"filled",onClose:i,color:r},o)))},O=a(16),_=a(15),S=a(189),x=a(190),z=a(191),X=a(192),Y=a(69),V=a(193),D=a(212);function B(e){var t=e.children,a=Object(S.a)({disableHysteresis:!0,threshold:20});return n.a.createElement(x.a,{appear:!1,direction:"down",in:a},n.a.cloneElement(t,{elevation:a?4:0}))}var L=Object(v.a)((function(e){return{root:{flexGrow:1},menuButton:{marginRight:e.spacing(2)},title:{flexGrow:1,color:"white"},text:{color:"white"}}}));function W(e){var t=L(),a=Object(r.useContext)(u),o=a.currentTheme,i=a.setTheme,l=Boolean("dark"===o);return n.a.createElement("div",{className:t.root},n.a.createElement(B,e,n.a.createElement(z.a,null,n.a.createElement(X.a,null,n.a.createElement(O.b,{to:"/movie-recommender-frontend/",className:t.title},n.a.createElement(Y.a,{variant:"h5",className:t.title},"REC")),n.a.createElement(O.b,{to:"/movie-recommender-frontend/login"},n.a.createElement(V.a,{variant:"body2",className:t.title},"Login")),n.a.createElement(O.b,{to:"/movie-recommender-frontend/register"},n.a.createElement(V.a,{variant:"body2",className:t.title},"Register")),n.a.createElement(O.b,{to:"/movie-recommender-frontend/select"},n.a.createElement(V.a,{variant:"body2",className:t.title},"Select")),n.a.createElement(O.b,{to:"/movie-recommender-frontend/"},n.a.createElement(V.a,{variant:"body2",className:t.title},"Dashboard")),n.a.createElement(D.a,{checked:l,onChange:function(e){var t=e.target.checked;i(t?"dark":"light")}})))))}var Q=a(36),A=a.n(Q),C=a(51),F=a(42),G=a(26),I=a(66),Z=a.n(I),q=(a(96),function(){var e=Object(r.useState)({email:"",password:""}),t=Object(c.a)(e,2),a=t[0],o=t[1],i=a.email,l=a.password,p=function(e){return o(Object(G.a)(Object(G.a)({},a),{},Object(F.a)({},e.target.name,e.target.value)))},m=function(){var e=Object(C.a)(A.a.mark((function e(t){var a,r,n,o;return A.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),a={email:i,password:l},e.prev=2,r={headers:{"Content-Type":"application/json"}},n=JSON.stringify(a),e.next=7,Z.a.post("/api/auth",n,r);case 7:o=e.sent,console.log(o.data),e.next=15;break;case 11:e.prev=11,e.t0=e.catch(2),console.error(e.t0.response.data),console.log("Invalid credentials");case 15:case"end":return e.stop()}}),e,null,[[2,11]])})));return function(t){return e.apply(this,arguments)}}();return n.a.createElement("div",{class:"container"},n.a.createElement("h1",{className:"large text-primary"},"Sign In"),n.a.createElement("p",{className:"lead"},n.a.createElement("i",{className:"fas fa-user"})," Sign into Your Account"),n.a.createElement("form",{className:"form",onSubmit:function(e){return m(e)}},n.a.createElement("div",{className:"form-group"},n.a.createElement("input",{type:"email",placeholder:"Email Address",name:"email",value:i,onChange:function(e){return p(e)},required:!0})),n.a.createElement("div",{className:"form-group"},n.a.createElement("input",{type:"password",placeholder:"Password",value:l,onChange:function(e){return p(e)},name:"password",minLength:"6"})),n.a.createElement("input",{type:"submit",className:"btn btn-primary",value:"Login"})),n.a.createElement("p",{className:"my-1"},"Don't have an account?"," ",n.a.createElement(O.b,{to:"/movie-recommender-frontend/register"},"Sign Up")))}),R=function(){var e=Object(r.useState)({name:"",email:"",password:"",password2:""}),t=Object(c.a)(e,2),a=t[0],o=t[1],i=a.name,l=a.email,p=a.password,m=a.password2,s=function(e){return o(Object(G.a)(Object(G.a)({},a),{},Object(F.a)({},e.target.name,e.target.value)))},g=function(){var e=Object(C.a)(A.a.mark((function e(t){var a,r,n,o;return A.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),p===m){e.next=5;break}console.log("Passwords do not match"),e.next=18;break;case 5:return a={name:i,email:l,password:p},e.prev=6,r={headers:{"Content-Type":"application/json"}},n=JSON.stringify(a),e.next=11,Z.a.post("/api/users",n,r);case 11:o=e.sent,console.log(o.data),e.next=18;break;case 15:e.prev=15,e.t0=e.catch(6),console.error(e.t0.response.data);case 18:case"end":return e.stop()}}),e,null,[[6,15]])})));return function(t){return e.apply(this,arguments)}}();return n.a.createElement("div",{class:"container"},n.a.createElement("h1",{className:"large text-primary"},"Sign Up"),n.a.createElement("p",{className:"lead"},n.a.createElement("i",{className:"fas fa-user"})," Create Your Account"),n.a.createElement("form",{className:"form",onSubmit:function(e){return g(e)}},n.a.createElement("div",{className:"form-group"},n.a.createElement("input",{type:"text",placeholder:"Name",name:"name",value:i,onChange:function(e){return s(e)},required:!0})),n.a.createElement("div",{className:"form-group"},n.a.createElement("input",{type:"email",placeholder:"Email Address",name:"email",value:l,onChange:function(e){return s(e)},required:!0}),n.a.createElement("small",{className:"form-text"},"This site uses Gravatar so if you want a profile image, use a Gravatar email")),n.a.createElement("div",{className:"form-group"},n.a.createElement("input",{type:"password",placeholder:"Password",name:"password",value:p,onChange:function(e){return s(e)},minLength:"6"})),n.a.createElement("div",{className:"form-group"},n.a.createElement("input",{type:"password",placeholder:"Confirm Password",name:"password2",value:m,onChange:function(e){return s(e)},minLength:"6"})),n.a.createElement("input",{type:"submit",className:"btn btn-primary",value:"Register"})),n.a.createElement("p",{className:"my-1"},"Already have an account?"," ",n.a.createElement(O.b,{to:"/movie-recommender-frontend/login"},"Sign In")))},P=a(196),H=a(205),K=a(107),J=a(80),U=a(194),$=a(195);K.a.registerPlugin(J.a);var ee=function(){var e=Object(r.useRef)(null),t=Object(r.useRef)(null);return Object(r.useEffect)((function(){var a=t.current.getTotalLength(),r=1929,n=[];!function(){for(var e=0;e<a-15;e+=5)n.push(r),r++}(),J.a.create(e.current,{liveSnap:function(e){var t;return t=5*Math.round(e/5)/5,document.getElementById("demo").innerHTML=n[t],5*Math.round(e/5)},type:"x",bounds:t.current})})),n.a.createElement(U.a,null,n.a.createElement($.a,null,n.a.createElement("svg",{width:"539",height:"397",viewBox:"0 0 500 500",xmlns:"http://www.w3.org/2000/svg"},n.a.createElement("rect",{id:"poster",x:"90",y:"100",height:"200",width:"475",fill:"yellow"}),n.a.createElement("g",null,n.a.createElement("path",{id:"path",ref:t,d:"M90 300 h 475",fill:"red",stroke:"red",strokeWidth:"15",strokeLinecap:"round"}),n.a.createElement("circle",{id:"drag",ref:e,cx:"100",cy:"300",r:"10",stroke:"black",strokeWidth:"3",fill:"green"}))),n.a.createElement("p",{id:"demo"})))},te=a(197),ae=a(109),re=[{title:"Casino",posterPath:"/xo517ibXBDdYQY81j0WIG7BVcWq.jpg",genres:"Crime|Drama"},{title:"Dangerous Minds",posterPath:"/y5Jee3QmYOlpqfaPPbfvtdVc5wj.jpg",genres:"Drama"},{title:"Carrington",posterPath:"/a7w6rPdTBgWAx6lnhwHemPx9pEw.jpg",genres:"Drama|Romance"},{title:"Eye for an Eye",posterPath:"/y2lZSdJ1o0VvLegTw3ad6KFtxra.jpg",genres:"Drama|Thriller"},{title:"Target",posterPath:"/z0ezqAFMeGYd5mLEWaN8jC9eczF.jpg",genres:"Action|Drama"},{title:"Just Cause",posterPath:"/tPQ8kT5HVxfyKXVeoiC6NkF5gsu.jpg",genres:"Mystery|Thriller"},{title:"The Wild Bunch",posterPath:"/zZhp7p8qvfVrSLKpOFHcKjpEj8f.jpg",genres:"Adventure|Western"},{title:"The Visitors",posterPath:"/tKCeoKQzf5kwaAMBkfhLyphuJeL.jpg",genres:"Comedy|Fantasy|Sci-Fi"},{title:"Stalingrad",posterPath:"/hmk6RDLpScF7lpHYRuJvwRSug18.jpg",genres:"Drama|War"},{title:"That Thing You Do!",posterPath:"/luSHsQYyX0aukrHPL5joYOxcsO9.jpg",genres:"Comedy|Drama"}],ne=a(198),oe=Object(v.a)((function(e){return{image:{maxWidth:"200px",maxHeight:"200px",minWidth:"200px",minHeight:"200px",borderRadius:20,position:"absolute"},buttonbasestyle:{maxHeight:"20px",minWidth:"150px",minHeight:"20px",borderRadius:10,"&:hover":{color:"red"},marginBottom:10,marginTop:10},textStyle:{position:"absolute",top:104,fontSize:16,fontFamily:"Lato"}}}));function ie(){console.log("I am shoot")}function le(){var e=n.a.useState("guarded bayou"),t=Object(c.a)(e,2),a=t[0],r=(t[1],oe());return n.a.createElement(P.a,{container:!0,className:r.root,spacing:2},n.a.createElement(P.a,{item:!0,xs:12},n.a.createElement(ae.a,{style:{width:300,height:20}},n.a.createElement(P.a,{item:!0},n.a.createElement(te.a,null," Recommendation for ",a," ")," ")," ")," "),n.a.createElement(P.a,{item:!0,xs:12},n.a.createElement(P.a,{container:!0,justify:"center",spacing:1}," ",re.map((function(e){return n.a.createElement(P.a,{item:!0},n.a.createElement(ne.a,{className:r.buttonbasestyle,onClick:ie},e.title," ")," ")}))," ")," ")," ")}var pe=a(199),ce=a(200),me=a(201),se=a(188),ge=a(202),he=a(102),de=a.n(he),ue=a(3),je=Object(v.a)((function(e){return{root:{marginTop:10},media:{width:"100%",maxHeight:300,objectFit:"cover"},expand:{transform:"rotate(0deg)",marginLeft:"auto",transition:e.transitions.create("transform",{duration:e.transitions.duration.shortest})},expandOpen:{transform:"rotate(180deg)"}}})),be=function(e){var t=e.movie,a=je(),o=Object(r.useState)(!1),i=Object(c.a)(o,2),l=i[0],p=i[1];return n.a.createElement(U.a,{className:a.root},n.a.createElement(pe.a,{title:t.Title}),n.a.createElement(ce.a,{component:"img",className:a.media,image:t.Poster}),n.a.createElement($.a,null,n.a.createElement(Y.a,{align:"center"},t.Year," ",t.Genre," ",t.Runtime," "),t.Ratings.map((function(e){return n.a.createElement(Y.a,{align:"center",key:e.Source}," ",e.Source," : ",e.Value," ")}))),n.a.createElement(me.a,null,n.a.createElement(se.a,{onClick:function(){p(!l)},"aria-expanded":l,"aria-label":"Show More",className:Object(ue.a)(a.expand,Object(F.a)({},a.expandOpen,l))},n.a.createElement(de.a,null))),n.a.createElement(ge.a,{in:l,timeout:"auto",unmountOnExit:!0},n.a.createElement($.a,null,n.a.createElement(Y.a,{align:"center"},t.Actors),n.a.createElement(Y.a,{align:"center"}," BoxOffice: ",t.BoxOffice),n.a.createElement(Y.a,{variant:"body1",align:"justify"},t.Plot))))},fe=a(207),Ee=a(204),ye=a(209),we=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return new Promise((function(t){setTimeout(t,e)}))},ve=function(e){var t=e.setMovieSelected,a=Object(r.useState)(!1),o=Object(c.a)(a,2),i=o[0],l=o[1],p=Object(r.useState)([]),m=Object(c.a)(p,2),s=m[0],g=m[1],h=Object(r.useState)(""),d=Object(c.a)(h,2),u=d[0],j=d[1],b=Object(r.useState)(""),f=Object(c.a)(b,2),E=f[0],y=f[1],w=Object(r.useState)(!1),v=Object(c.a)(w,2),M=v[0],k=v[1];return Object(r.useEffect)((function(){var e=!0;return k(!0),Object(C.a)(A.a.mark((function t(){var a,r;return A.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(""===E){t.next=6;break}return t.next=3,fetch("".concat("https://api.themoviedb.org/3/search/movie?api_key=ea575fa4bf65c424e93e0c032ab5c5f2&language=en-US&query="," + ").concat(E,'+"&page=1&include_adult=false"'));case 3:a=t.sent,t.next=9;break;case 6:return t.next=8,fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=ea575fa4bf65c424e93e0c032ab5c5f2&language=en-US&page=1");case 8:a=t.sent;case 9:return t.next=11,we(500);case 11:return t.next=13,a.json();case 13:r=t.sent,e&&g(r.results),k(!1);case 16:case"end":return t.stop()}}),t)})))(),function(){e=!1}}),[E]),Object(r.useEffect)((function(){null!==u&&(console.log(u),t(u))}),[u,t]),n.a.createElement(ye.a,{freeSolo:!0,id:"autocomplete",open:i,onOpen:function(){l(!0)},onClose:function(){l(!1)},getOptionSelected:function(e,t){return e.title===t.title},getOptionLabel:function(e){return e.title},options:s,loading:M,inputValue:E,onChange:function(e,t){null!==t&&(j(t),y(""))},renderOption:function(e,t){t.selected;return n.a.createElement(n.a.Fragment,null,n.a.createElement(P.a,{container:!0,direction:"row"},n.a.createElement(P.a,{container:!0,direction:"column",justify:"center",alignItems:"center",item:!0,xs:8},n.a.createElement(P.a,{item:!0},n.a.createElement(Y.a,null,e.title)),n.a.createElement(P.a,{item:!0},n.a.createElement(Y.a,null,"(",e.vote_average,")"))),n.a.createElement(P.a,{item:!0,xs:4},n.a.createElement("img",{style:{objectFit:"cover"},src:"https://image.tmdb.org/t/p/w200"+e.poster_path,width:"100%",alt:s.title}))))},renderInput:function(e){return n.a.createElement(fe.a,Object.assign({},e,{label:"Movie Search",variant:"outlined",value:E,onChange:function(e){return y(e.target.value)},placeholder:"Search Movie",InputProps:Object(G.a)(Object(G.a)({},e.InputProps),{},{type:"search",endAdornment:n.a.createElement(n.a.Fragment,null,M?n.a.createElement(Ee.a,{color:"inherit",size:20}):null,e.InputProps.endAdornment)})}))}})},Me="https://www.omdbapi.com/?apikey=e4c29baa&t=",ke=function(){var e=Object(r.useState)(""),t=Object(c.a)(e,2),a=t[0],o=t[1],i=Object(r.useState)(""),l=Object(c.a)(i,2),p=l[0],m=l[1];return Object(r.useEffect)((function(){fetch("".concat(Me,"avengers")).then((function(e){return e.json()})).then((function(e){m(e)})).catch((function(e){return alert(e.message)}))}),[]),Object(r.useEffect)((function(){"undefined"!==typeof a&&(console.log(a),""!==a&&fetch("".concat(Me," + ").concat(a.title)).then((function(e){return e.json()})).then((function(e){"False"!==e.Response&&m(e)})).catch((function(e){return alert(e.message)})))}),[a]),n.a.createElement(n.a.Fragment,null,n.a.createElement(U.a,null,n.a.createElement(pe.a,{title:"Movie Search"}),n.a.createElement($.a,null,n.a.createElement(ve,{setMovieSelected:o}))),p?n.a.createElement(be,{movie:p}):null)},Ne=a(214),Te=Object(v.a)({root:{width:250,margin:50},input:{width:42},imge:{height:250,width:250},Slider:{marginTop:300,marginLeft:50}}),Oe=function(e){var t=e.imgList,a=Te(),o=Object(r.useState)(0),i=Object(c.a)(o,2),l=i[0],p=i[1];return console.log({imgList:t}),t.length>0&&n.a.createElement("div",{className:a.root},n.a.createElement("img",{className:a.imge,src:t[l],alt:l}),n.a.createElement(Ne.a,{value:l,onChange:function(e,t){t<92&&p(t)},"aria-labelledby":"input-slider"}))},_e=[{title:"parasite",poster_path:"https://image.tmdb.org/t/p/w185/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg"},{title:"Green Book",poster_path:"https://m.media-amazon.com/images/M/MV5BYzIzYmJlYTYtNGNiYy00N2EwLTk4ZjItMGYyZTJiOTVkM2RlXkEyXkFqcGdeQXVyODY1NDk1NjE@._V1_SX300.jpg"},{title:"The Shape of Water",poster_path:"https://image.tmdb.org/t/p/w185/9zfwPffUXpBrEP26yp0q1ckXDcj.jpg"},{title:"Moonlight",poster_path:"https://image.tmdb.org/t/p/w185/93NN95a71MsQ4tR2zSLv8BNK2qh.jpg"},{title:"Spotlight",poster_path:"https://image.tmdb.org/t/p/w185/gWkgMnIsd8Od7iyhEEKL5G4Qq6J.jpg"},{title:"12 Years a Slave",poster_path:"https://image.tmdb.org/t/p/w185/xdANQijuNrJaw1HA61rDccME4Tm.jpg"},{title:"Argo",poster_path:"https://image.tmdb.org/t/p/w185/2HVkfkgY1nvWTCRj3H1zTmlghUG.jpg"},{title:"The Artist",poster_path:"https://image.tmdb.org/t/p/w185/vvdif5UMQpMCrnnsOZQWujpaBW8.jpg"},{title:"The King's Speech",poster_path:"https://image.tmdb.org/t/p/w185/uQ538BfYLDJh3GXlzRZLo0j7PFj.jpg"},{title:"The Hurt Locker",poster_path:"https://image.tmdb.org/t/p/w185/8SwjvOchYljr7tSKpNeHjpyPbg5.jpg"},{title:"Slumdog Millionaire",poster_path:"https://image.tmdb.org/t/p/w185/5WU6uusqJrLfiBaNs3KpF4o8Lnj.jpg"},{title:"No Country for Old Men",poster_path:"https://image.tmdb.org/t/p/w185/6d5XOczc226jECq0LIX0siKtgHR.jpg"},{title:"The Departed",poster_path:"https://image.tmdb.org/t/p/w185/jyAgiqVSx5fl0NNj7WoGGKweXrL.jpg"},{title:"Crash",poster_path:"https://image.tmdb.org/t/p/w185/86BdPC6RDX88NC880pLidKn2LCj.jpg"},{title:"Million Dollar Baby",poster_path:"https://image.tmdb.org/t/p/w185/jcfEqKdWF1zeyvECPqp3mkWLct2.jpg"},{title:"Around the World in 80 Days",poster_path:"https://image.tmdb.org/t/p/w185/bBiMw6Jtg8tSTcEq8jFV7qk9TRW.jpg"},{title:"The Lord of the Rings: The Return of the King",poster_path:"https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"},{title:"Chicago",poster_path:"https://image.tmdb.org/t/p/w185/v1Sg3GuHDz9uhrKqYozOeCMLSpj.jpg"},{title:"A Beautiful Mind",poster_path:"https://image.tmdb.org/t/p/w185/zwzWCmH72OSC9NA0ipoqw5Zjya8.jpg"},{title:"Gladiator",poster_path:"https://image.tmdb.org/t/p/w185/pRn3TJHbAqCAO6U8Dw5DayVUuX3.jpg"},{title:"American Beauty",poster_path:"https://image.tmdb.org/t/p/w185/wby9315QzVKdW9BonAefg8jGTTb.jpg"},{title:"Shakespeare in Love",poster_path:"https://image.tmdb.org/t/p/w185/iNCTveBiq7jQ4Av4ynWSdWXN6Cc.jpg"},{title:"Titanic",poster_path:"https://image.tmdb.org/t/p/w185/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg"},{title:"The English Patient",poster_path:"https://image.tmdb.org/t/p/w185/yqaKkARc9Ku8mIENQt8bGVHaowJ.jpg"},{title:"Hamlet",poster_path:"https://image.tmdb.org/t/p/w185/ilurgUOp6SCl4cuhfjctj1qxlfZ.jpg"},{title:"Crash",poster_path:"https://image.tmdb.org/t/p/w185/5lDENqycd6WMXMPtD9GxWfYh4bq.jpg"},{title:"Braveheart",poster_path:"https://image.tmdb.org/t/p/w185/or1gBugydmjToAEq7OZY0owwFk.jpg"},{title:"Forrest Gump",poster_path:"https://image.tmdb.org/t/p/w185/clolk7rB5lAjs41SD0Vt6IXYLMm.jpg"},{title:"Schindler's List",poster_path:"https://image.tmdb.org/t/p/w185/c8Ass7acuOe4za6DhSattE359gr.jpg"},{title:"Unforgiven",poster_path:"https://image.tmdb.org/t/p/w185/yKyLJmRAtyXEEYKOvPhKHXIcPq9.jpg"},{title:"The Silence of the Lambs",poster_path:"https://image.tmdb.org/t/p/w185/rplLJ2hPcOQmkFhTqUte0MkEaO2.jpg"},{title:"Hamlet",poster_path:"https://image.tmdb.org/t/p/w185/ycM8gwwyOLXW4qxkcu6nhLlfgcA.jpg"},{title:"Dances with Wolves",poster_path:"https://m.media-amazon.com/images/M/MV5BMTY3OTI5NDczN15BMl5BanBnXkFtZTcwNDA0NDY3Mw@@._V1_SX300.jpg"},{title:"Driving Miss Daisy",poster_path:"https://image.tmdb.org/t/p/w185/iaCzvcY42HihFxQBTZCTKMpsI0P.jpg"},{title:"Rain Man",poster_path:"https://image.tmdb.org/t/p/w185/8L6EMburnnVx8cvQmhGgC826JNc.jpg"},{title:"The Last Emperor",poster_path:"https://image.tmdb.org/t/p/w185/7CZSCaGxCD2HXo8LrdcW183moqJ.jpg"},{title:"Platoon",poster_path:"https://image.tmdb.org/t/p/w185/m3mmFkPQKvPZq5exmh0bDuXlD9T.jpg"},{title:"Out of Africa",poster_path:"https://image.tmdb.org/t/p/w185/3eLAm1kuVD5QZCOydbiu7j6GAbw.jpg"},{title:"Amadeus",poster_path:"https://image.tmdb.org/t/p/w185/ryLzgil9aNj6JRi2dmLapuMX5pt.jpg"},{title:"Terms of Endearment",poster_path:"https://image.tmdb.org/t/p/w185/hhSRt1KKfRT0yEhEtRW3qp31JFU.jpg"},{title:"Gandhi",poster_path:"https://image.tmdb.org/t/p/w185/wo5Ed3Yhejts5FIG48CA2gsWPoN.jpg"},{title:"Chariots of Fire",poster_path:"https://image.tmdb.org/t/p/w185/Ae5ABhyD30jY9rkciOVCG8nJDwO.jpg"},{title:"Ordinary People",poster_path:"https://image.tmdb.org/t/p/w185/kPt2AQiSP39g3I1TtAnjSGQwN9S.jpg"},{title:"Kramer vs. Kramer",poster_path:"https://image.tmdb.org/t/p/w185/6IVQjDTbr7pXx2AR8jovbYwpyiF.jpg"},{title:"The Deer Hunter",poster_path:"https://image.tmdb.org/t/p/w185/wT3DeCZ3Ax5VYhKu6ajyEvA1hXG.jpg"},{title:"Annie Hall",poster_path:"https://image.tmdb.org/t/p/w185/wvNu1wnAwHvFyq0gVgtGVG1z5bb.jpg"},{title:"Rocky",poster_path:"https://image.tmdb.org/t/p/w185/i5xiwdSsrecBvO7mIfAJixeEDSg.jpg"},{title:"One Flew Over the Cuckoo's Nest",poster_path:"https://image.tmdb.org/t/p/w185/3jcbDmRFiQ83drXNOvRDeKHxS0C.jpg"},{title:"The Godfather: Part II",poster_path:"https://m.media-amazon.com/images/M/MV5BMWMwMGQzZTItY2JlNC00OWZiLWIyMDctNDk2ZDQ2YjRjMWQ0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"},{title:"The Sting",poster_path:"https://m.media-amazon.com/images/M/MV5BNGU3NjQ4YTMtZGJjOS00YTQ3LThmNmItMTI5MDE2ODI3NzY3XkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg"},{title:"The Godfather",poster_path:"https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"},{title:"Ben",poster_path:"https://m.media-amazon.com/images/M/MV5BYzBmMTMxNzUtMzNhMi00NDE2LWFjNjQtOTUyOGQ5MjcyMjU3XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"},{title:"The French Connection",poster_path:"https://image.tmdb.org/t/p/w185/5XSGvIKl2yPvOkieFjc3rzLw7x0.jpg"},{title:"Patton",poster_path:"https://image.tmdb.org/t/p/w185/rLM7jIEPTjj4CF7F1IrzzNjLUCu.jpg"},{title:"Midnight Cowboy",poster_path:"https://image.tmdb.org/t/p/w185/f7YLzOxwWzeEdo7RhAlPSBTYa8.jpg"},{title:"Oliver!",poster_path:"https://image.tmdb.org/t/p/w185/1XJgoaOWKrqxkKeBKWLKSigqG8c.jpg"},{title:"In the Heat of the Night",poster_path:"https://image.tmdb.org/t/p/w185/fvqHTabYej3LwzKRRZCm6jV3g0O.jpg"},{title:"Birdman",poster_path:"https://m.media-amazon.com/images/M/MV5BZTk3NjA1M2EtYTQ2Ny00ZTlmLThjMTQtYzhiY2I1ODM0MzdlXkEyXkFqcGdeQXVyNjExODE1MDc@._V1_SX300.jpg"},{title:"A Man for All Seasons",poster_path:"https://image.tmdb.org/t/p/w185/ahm5uXNaBKiHYGyerKBDcso1TEZ.jpg"},{title:"The Sound of Music",poster_path:"https://image.tmdb.org/t/p/w185/nv8bcyqXJh2tijWLa3MoUktlVZZ.jpg"},{title:"My Fair Lady",poster_path:"https://image.tmdb.org/t/p/w185/3kqjmFdwZ9kXnTDkWsJQAfJn7gS.jpg"},{title:"Tom Jones",poster_path:"https://m.media-amazon.com/images/M/MV5BODEwMGMzNjktODU4NC00NGIyLWJiNTAtZTRlOTc2MGY2NjBhXkEyXkFqcGdeQXVyMjgyNjk3MzE@._V1_SX300.jpg"},{title:"Lawrence of Arabia",poster_path:"https://image.tmdb.org/t/p/w185"},{title:"West Side Story",poster_path:"https://image.tmdb.org/t/p/w185/4YwmVcQyXxiOPqp5oaLkGkkwm9g.jpg"},{title:"The Apartment",poster_path:"https://image.tmdb.org/t/p/w185/hhSRt1KKfRT0yEhEtRW3qp31JFU.jpg"},{title:"Gigi",poster_path:"https://m.media-amazon.com/images/M/MV5BMWIzNzlkMWUtY2VhYy00NWMwLTg3MWUtZWY4ODZjMjBiMmM1XkEyXkFqcGdeQXVyMDI2NDg0NQ@@._V1_SX300.jpg"},{title:"The Bridge on the River Kwai",poster_path:"https://image.tmdb.org/t/p/w185/rVWacfczT3i1GOjqp2u4K9wahta.jpg"},{title:"Marty",poster_path:"https://m.media-amazon.com/images/M/MV5BMDhjZjAzZTktMTY0MC00ZTVhLWE4NDQtZjIyN2JiYjZlMjU0XkEyXkFqcGdeQXVyMTg2NTc4MzA@._V1_SX300.jpg"},{title:"On the Waterfront",poster_path:"https://image.tmdb.org/t/p/w185/v1RtJ1qR4v9nrnfoBVBl6hjTW9.jpg"},{title:"From Here to Eternity",poster_path:"https://image.tmdb.org/t/p/w185/dXuY3rDdu0Em3xsyPYrlhLKz9KE.jpg"},{title:"The Greatest Show on Earth",poster_path:"https://m.media-amazon.com/images/M/MV5BMzg5MWIyMjItYWMyYS00YTFjLWFlZGMtZTJkNzgyY2VmY2U2XkEyXkFqcGdeQXVyNzE2NDk3NTY@._V1_SX300.jpg"},{title:"An American in Paris",poster_path:"https://image.tmdb.org/t/p/w185/lyDXkvG53ldz6Cf7dbjJl7TaoP5.jpg"},{title:"All About Eve",poster_path:"https://image.tmdb.org/t/p/w185/6numIZH6uR3NlJgY9m7nGH0jhs.jpg"},{title:"All the Kings Men: A Wack Pack Documentary",poster_path:"https://image.tmdb.org/t/p/w185N/A"},{title:"The Best Years of Our Lives",poster_path:"https://image.tmdb.org/t/p/w185/ba6GlZzRlh7OHUitFnzUF1U7gpu.jpg"},{title:"The Lost Weekend",poster_path:"https://image.tmdb.org/t/p/w185/5fZWKQREZ3QVNjBKMLa7NmqufnE.jpg"},{title:"Going My Way",poster_path:"https://m.media-amazon.com/images/M/MV5BODU3MDUzMzItNjk4Ni00ODQxLWI2NDUtNDIzMzc5YmYyMTYwXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg"},{title:"Casablanca",poster_path:"https://image.tmdb.org/t/p/w185/m9tut4CqlBUWwnWQIu90pZB7Hn0.jpg"},{title:"Rebecca",poster_path:"https://image.tmdb.org/t/p/w185/kGhllBArW7ImDycSMIG5bj6GEPL.jpg"},{title:"How Green Was My Valley",poster_path:"https://image.tmdb.org/t/p/w185/zmYNtzq3B17DSpDYkF3JUHBa8Yx.jpg"},{title:"Rebecca",poster_path:"https://image.tmdb.org/t/p/w185/3Gla0nxHboX3nxQzaU4SoqOtTjh.jpg"},{title:"Gone with the Wind",poster_path:"https://m.media-amazon.com/images/M/MV5BYjUyZWZkM2UtMzYxYy00ZmQ3LWFmZTQtOGE2YjBkNjA3YWZlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"},{title:"You Can't Take It with You",poster_path:"https://m.media-amazon.com/images/M/MV5BMTYzYzY0YzgtN2ZhNy00MjNiLTk1NTYtYTQ2M2E3NjJiOWYxXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg"},{title:"The Life of Emile Zola",poster_path:"https://m.media-amazon.com/images/M/MV5BNDI2ODAyNDQzMV5BMl5BanBnXkFtZTgwNzE2MzI2MzE@._V1_SX300.jpg"},{title:"The Great Ziegfeld",poster_path:"https://m.media-amazon.com/images/M/MV5BOTEzMTZjNjQtMDdiOC00YzU3LTgwODItYjEyYjRiNWFiNmZkXkEyXkFqcGdeQXVyMDI2NDg0NQ@@._V1_SX300.jpg"},{title:"Mutiny on the Bounty",poster_path:"https://m.media-amazon.com/images/M/MV5BYThmYTIyZDctMjhlOC00ZTI1LWI5NDctYjdkMDJmN2FhODk5XkEyXkFqcGdeQXVyNjUwMzI2NzU@._V1_SX300.jpg"},{title:"It Happened One Night",poster_path:"https://image.tmdb.org/t/p/w185/wx4ptyx3vlPBVl5DzBA8KomcJww.jpg"},{title:"Cavalcade",poster_path:"https://m.media-amazon.com/images/M/MV5BNWJlMjljMmItZTNiNC00NGI3LWFhYzgtMTk1ZmNhZjZiYzU2XkEyXkFqcGdeQXVyMDI2NDg0NQ@@._V1_SX300.jpg"},{title:"Grand Hotel",poster_path:"https://m.media-amazon.com/images/M/MV5BODc5OWY0MWQtZjgzMS00YTA1LTk1ZmEtY2VmYTgwYmU4ZjAwXkEyXkFqcGdeQXVyMDI2NDg0NQ@@._V1_SX300.jpg"},{title:"Cimarron",poster_path:"https://m.media-amazon.com/images/M/MV5BYWQwZGM0MTktNDM1NC00MTZlLTllNzctYTllZWI2MzdiNmMyXkEyXkFqcGdeQXVyNjUwMzI2NzU@._V1_SX300.jpg"},{title:"All Quiet on the Western Front",poster_path:"https://image.tmdb.org/t/p/w185/yAU6jklJLUjZot3WyvyJrxVdLKb.jpg"},{title:"Wings",poster_path:"https://m.media-amazon.com/images/M/MV5BYTI1YjgzZmMtZmIyYy00YTkwLTgyOWEtOTVlNTFkZmMzNTk3XkEyXkFqcGdeQXVyMDI2NDg0NQ@@._V1_SX300.jpg"},{title:"The Broadway Melody",poster_path:"https://m.media-amazon.com/images/M/MV5BZmJlOWM4NDEtYmZmYS00MTIyLTgwYWMtMjFhYmNhZWU4ZmVmXkEyXkFqcGdeQXVyMDI2NDg0NQ@@._V1_SX300.jpg"}];function Se(){var e=Object(p.b)(),t=_e.map((function(e){return e.poster_path}));return n.a.createElement(n.a.Fragment,null,n.a.createElement("section",{className:"landing"},n.a.createElement("div",{className:"dark-overlay"},n.a.createElement("div",{className:"landing-inner"},n.a.createElement("h1",{className:"x-large"}," Movie Recommender ")," ",n.a.createElement("p",{className:"lead"},"Alright!Alright!Alright!You come to a fine place if you are confused on what to watch next ? We will help you to take the decision. ")," ",n.a.createElement("div",{className:"buttons"},n.a.createElement(P.a,{container:!0,direction:"row",justify:"center",alignItems:"center",spacing:2},n.a.createElement(P.a,{item:!0},n.a.createElement(O.b,{to:"/movie-recommender-frontend/register"},n.a.createElement(V.a,{color:"secondary",variant:"contained"},"Register ")," ")," ")," ",n.a.createElement(P.a,{item:!0},n.a.createElement(O.b,{to:"/movie-recommender-frontend/login"},n.a.createElement(V.a,{color:"primary",variant:"contained"},"Login ")," ")," ")," ",n.a.createElement(P.a,{item:!0},n.a.createElement(O.b,{to:"/movie-recommender-frontend/select"},n.a.createElement(V.a,{color:"primary",variant:"contained"},"Selection ")," ")," ")," ",n.a.createElement(P.a,{item:!0},n.a.createElement(O.b,{to:"/movie-recommender-frontend/"},n.a.createElement(V.a,{color:"primary",variant:"contained"},"Home ")," ")," ")," ")," ")," ")," ")," "),n.a.createElement(H.a,{maxWidth:"lg"},n.a.createElement(P.a,{container:!0,direction:"column",spacing:4},n.a.createElement(P.a,{item:!0}," "),n.a.createElement(P.a,{item:!0,container:!0},n.a.createElement(P.a,{item:!0,container:!0,direction:"row",spacing:4},n.a.createElement(P.a,{item:!0,sm:8},n.a.createElement(P.a,{item:!0,container:!0,direction:"column"},n.a.createElement(P.a,{item:!0},n.a.createElement(le,null),n.a.createElement(ee,null),n.a.createElement(Oe,{imgList:t})," ")," ")," ")," ",n.a.createElement(P.a,{item:!0,sm:4},n.a.createElement(ke,null))," ")," "),n.a.createElement(P.a,{item:!0,container:!0},n.a.createElement(P.a,{item:!0,container:!0,direction:"row",spacing:4},n.a.createElement(P.a,{item:!0,sm:8},n.a.createElement(P.a,{item:!0,container:!0,direction:"column"},n.a.createElement(P.a,{item:!0},n.a.createElement(V.a,{variant:"contained",color:"primary",onClick:function(){e(E({snackbarOpen:!0,snackbarType:"success",snackbarMessage:"Snackbar launched"}))}},"Launch Snackbar ")," ")," ")," ")," ")," ")," ")," ")," ")}var xe=a(208),ze=Object(v.a)((function(e){return{headerStyle:{textAlign:"center",fontSize:40,fontFamily:"Trispace"},subHeaderStyle:{textAlign:"center",fontFamily:"Lato"}}})),Xe=function(){var e=ze();return n.a.createElement("div",null,n.a.createElement(Y.a,{className:e.headerStyle},"Let us Recommend!"),n.a.createElement(Y.a,{className:e.subHeaderStyle},"What are your favorite movies? The more you select, the better your recommendations!"))},Ye=a(104),Ve=a.n(Ye),De=[],Be=function(e){var t=Object(r.useState)("false"),a=Object(c.a)(t,2),o=a[0],i=a[1],l=Object(r.useState)("false"),p=Object(c.a)(l,2),m=p[0],s=p[1],g=Object(r.useState)("false"),h=Object(c.a)(g,2),d=h[0],u=h[1];var j=Object(v.a)((function(e){return{image:{maxWidth:"200px",maxHeight:"200px",minWidth:"200px",minHeight:"200px",borderRadius:400,position:"absolute"},buttonbasestyle:{maxWidth:"200px",maxHeight:"200px",minWidth:"200px",minHeight:"200px",borderRadius:400,"&:hover":{color:"red"},marginBottom:24,marginTop:16},iconStyle:{opacity:d?0:1,position:"absolute",color:"red"},divStyle:{position:"relative",display:"flex",alignItems:"center",justifyContent:"center",opacity:m?1:.7},textStyle:{position:"absolute",top:104,fontSize:16,fontFamily:"Lato",color:o?e.palette.text:"#8B0000"}}}))();return n.a.createElement(ne.a,{className:j.buttonbasestyle,onClick:function(){i(!o),s(!m),u(!d),De.includes(e.title)?De.splice(De.indexOf(e.title),1):De.push(e.title),e.showHide(De)}},n.a.createElement(xe.a,{className:j.divStyle,textAlign:"center"},n.a.createElement("img",{className:j.image,src:"https://image.tmdb.org/t/p/w185"+e.poster_path,alt:"rohit"}),n.a.createElement(Y.a,{variant:"h6",color:"textPrimary",className:j.textStyle},e.title),n.a.createElement(Ve.a,{className:j.iconStyle,fontSize:"large"})))},Le=function(e){var t=Object(v.a)((function(e){return{footerStyle:{textAlign:"center",padding:"16px",position:"fixed",left:"0",bottom:"0",height:"80px",width:"100%"},buttonStyle:{fontFamily:"Trispace",borderRadius:24,width:240,height:48,backgroundColor:"#7986cb",color:"white","&:hover":{backgroundColor:"#303f9f"}},textStyle:{fontFamily:"Lato"}}}))();return e.check?n.a.createElement(ae.a,{className:t.footerStyle},n.a.createElement(V.a,{className:t.buttonStyle}," Finished")):n.a.createElement(ae.a,{className:t.footerStyle},n.a.createElement(Y.a,null,"Select at least one movie or use the search bar."))},We=[{poster_path:"/emSTzEr2qdo3lV14ZQ3uIYsqHJS.jpg",title:"Shadows"},{poster_path:"/tWkYclnnChwoMMBFECsEjd5hb77.jpg",title:"Wallace & Gromit: The Best of Aardman Animation"},{poster_path:"/faHxYNlQ7RGDtqmaNBpFf0HKozg.jpg",title:"Marlene Dietrich: Shadows and Light"},{poster_path:"/p5SC0B48GKtwOMLVK0qdY4p164F.jpg",title:"The Hippie Revolution"},{poster_path:"/s8ys1qnwM8VU6jIPlrRoiBz40RV.jpg",title:"Plutonium Circus"},{poster_path:"/3tNISfteDbGI09O5HZnedzOFekb.jpg",title:"Talking About Sex"},{poster_path:"/k36bQGCz3YS6yG8VrnmCyGtwFqs.jpg",title:"Last Call"},{poster_path:"/zWOoJagc3FvGJZdXdzhQf56gFsv.jpg",title:"Zaproszenie"},{poster_path:"/oLiGUX2Y6hhXlzuGvKGPNs8m5R0.jpg",title:"Creature"},{poster_path:"/aQRsSJRIEikojitfQTPxkiVzg9.jpg",title:"Blindness"},{poster_path:"/9sZjp6QuRORKdrQK7WdXsulzxKZ.jpg",title:"Break of Hearts"},{poster_path:"/gdqYh8ii94hKwFsDvVMrkLyrooJ.jpg",title:"Les D\xe9mons de J\xe9sus"},{poster_path:"/wcBwDBqFtUs1DwZIhAGVcHgk1sM.jpg",title:"Crazy Like a Fox"},{poster_path:"/1XfX58k7OlItR3wfSyPg0tS9JfK.jpg",title:"A Thousand and One Nights"},{poster_path:"/b73kg6GIuUBAHavvQm2AKSCBA1.jpg",title:"The Bubble"},{poster_path:"/8Q7Tb9oxipNDR0pxAknn2WAyvNe.jpg",title:"Sex and a Girl"},{poster_path:"/2mv5BbmqCNRsYYrEXEUAcWplXrQ.jpg",title:"The Only Game in Town"},{poster_path:"/5TX7jbrPasb7xMOzyBg6GIRGCqE.jpg",title:"The Shock"},{poster_path:"/iRttttky5dKHB4KASLXQ6ag8lk1.jpg",title:"That's Black Entertainment"},{poster_path:"/2z7BJUl5ROdyXpjzPmZw2iHMpHf.jpg",title:"Dead Husbands"},{poster_path:"/dRBU3BRf8YYknuEYepP3x59FO0H.jpg",title:"Vigilante Force"},{poster_path:"/9LEbYn6qiMRvUksqIF0bB4LQhZQ.jpg",title:"Agency"},{poster_path:"/cHkMHREgNmHACKMlEo2iORbBLgs.jpg",title:"Le secret de ma m\xe8re"},{poster_path:"/f9aLBFabaHCpOCkE5hhAneDN4i7.jpg",title:"February"},{poster_path:"/8TzFvby9RvtboMGAnykr6d7dBMY.jpg",title:"Talento de barrio"},{poster_path:"/2sqc479ZwNP1IZdFMnGkjaazYlm.jpg",title:"The Wrestler"},{poster_path:"/uoQ3adOlbQM6ZWX1q1mwUFOh7XS.jpg",title:"Olli's Apprenticeship"},{poster_path:"/82tLJ3tEIhCiFqQqFN6Jjn0QP2T.jpg",title:"It Happened at the Inn"},{poster_path:"/wVgoabbirpJP25SkmxlnB6UQCSv.jpg",title:"Adi\xf3s Amigo"},{poster_path:"/qA4iyHMU9ZXVDftW0gaQHykIu9s.jpg",title:"Adventures of Captain Fabian"},{poster_path:"/ypkgQz7Ajf8bLVj0gvvMn1YL1N2.jpg",title:"One Good Man"},{poster_path:"/rZofWTbUqkWhxgwAc8eICHVrLIQ.jpg",title:"Ashes and Blood"},{poster_path:"/9idxe5EGQH5fIySR8FwpZkBc9g0.jpg",title:"Solstice"},{poster_path:"/agc40VTSFFw6hTiTeLr8PG8rZg6.jpg",title:"Sun of the Sleepless"},{poster_path:"/73zJIVcd6vvKNXTnMuI152PPgKh.jpg",title:"Vampitheatre"},{poster_path:"/iTKXuH8JeHD26K6nN6ZrNOyuIQm.jpg",title:"Zero Degrees of Separation"},{poster_path:"/dMPQK36aU8kKPmjCsOswtmybWq5.jpg",title:"Edge of America"},{poster_path:"/uevhbqzynSLp5hcvzCVDyQinAIk.jpg",title:"The Viking"},{poster_path:"/iznMtXOWiQd3mbOvOz8RasIGdTW.jpg",title:"Deadly Delicious"},{poster_path:"/eW1AeFmqbYSDF5YDX4vPdTJ8VKl.jpg",title:"The Rothschilds"},{poster_path:"/78ZI0yz2NQvsVqX6RBOfuaIkSVD.jpg",title:"The Perfect Gentleman"},{poster_path:"/g9Tyl2FQqiSRpjkt3pZny7hoJFL.jpg",title:"Streetballers"},{poster_path:"/fAj5GUxZVcl0Sh3ey7DOJLtUXHL.jpg",title:"The Singer Not the Song"},{poster_path:"/vhAP81MImf9vCZydVzXStWjGRgy.jpg",title:"My Brother Talks to Horses"},{poster_path:"/pQETjZScKWWpHUlG5fWYI7C3V7L.jpg",title:"Badland"},{poster_path:"/kXFzvtndQirKKjvE4DERcdpG3RP.jpg",title:"Westward Passage"},{poster_path:"/o0MsQLQJheqvti80HLzAQvMos1Z.jpg",title:"Love Crimes Of Kabul"},{poster_path:"/pXbZVZVQUOLGtbLr2ezuDvJfX1B.jpg",title:"Our Very Own"},{poster_path:"/lXazlea1IV2gwP4HrmXfBq0C4xd.jpg",title:"Please Believe Me"},{poster_path:"/wBX1MM73WVLs0MNlXxAZyUKwH27.jpg",title:"Cedar Boys"}],Qe=function(){var e=Object(r.useState)(!1),t=Object(c.a)(e,2),a=t[0],o=t[1],i=function(e){console.log(e),void 0===e||e.length<1?o(!1):o(!0)};return n.a.createElement(P.a,{item:!0,container:!0,spacing:4},We.map((function(e){return n.a.createElement(P.a,{item:!0,container:!0,xs:12,sm:6,md:3,justify:"center",alignItems:"center"},n.a.createElement(Be,Object.assign({},e,{showHide:i})))})),n.a.createElement(Le,{check:a}))},Ae=a(213),Ce=a(105),Fe=a.n(Ce),Ge=function(){var e=Object(r.useState)({movieQuery:"",movie:""}),t=Object(c.a)(e,2),a=t[0],o=t[1],i=function(){""!==a.movieQuery&&fetch("".concat("https://www.omdbapi.com/?apikey=e4c29baa&t="," + ").concat(a.movieQuery)).then((function(e){return e.json()})).then((function(e){"False"!==e.Response&&o(Object(G.a)(Object(G.a)({},a),{},{movie:e}))})).catch((function(e){return alert(e.message)}))},l=Object(v.a)((function(e){return{searchBarStyle:{width:800,borderRadius:"24px",alignItems:"center",padding:"2px 4px",marginTop:16,marginBottom:8,display:"flex","&:hover":{boxShadow:"0px 0px 8px 1px rgba(0,0,0,0.2)"},boxShadow:"0px 0px 0px 1px rgba(0,0,0,0.2)"},input:{marginLeft:e.spacing(4),flex:1},iconButton:{padding:10}}}))();return console.log(a.movieQuery),n.a.createElement(U.a,{component:"form",className:l.searchBarStyle},n.a.createElement(Ae.a,{className:l.input,placeholder:"Search Movie",inputProps:{"aria-label":"search google maps"}}),n.a.createElement(se.a,{type:"submit",className:l.iconButton,"aria-label":"search",onChange:function(e){o({movieQuery:e.target.value})},onKeyPress:function(e){"Enter"===e.key&&i()}},n.a.createElement(Fe.a,null)))},Ie=function(){return n.a.createElement(H.a,null,n.a.createElement(P.a,{container:!0,direction:"column"},n.a.createElement(P.a,{item:!0,xs:12},n.a.createElement(Xe,null)),n.a.createElement(P.a,{item:!0,align:"center"},n.a.createElement(Ge,null)),n.a.createElement(P.a,{item:!0,container:!0},n.a.createElement(Qe,null)),n.a.createElement(P.a,{item:!0,xs:12},n.a.createElement(xe.a,{height:100}))))},Ze=function(){return n.a.createElement(O.a,null,n.a.createElement(W,null),n.a.createElement(_.c,null,n.a.createElement(_.a,{exact:!0,path:"/movie-recommender-frontend/",component:Se}),n.a.createElement(_.a,{exact:!0,path:"/movie-recommender-frontend/login",component:q}),n.a.createElement(_.a,{exact:!0,path:"/movie-recommender-frontend/register",component:R}),n.a.createElement(_.a,{exact:!0,path:"/movie-recommender-frontend/select",component:Ie}),n.a.createElement(_.a,{exact:!0,path:"/movie-recommender-frontend/dashboard",component:Se})))};function qe(){return n.a.createElement(j,null,n.a.createElement(p.a,{store:w},n.a.createElement(l.a,null),n.a.createElement(T,null),n.a.createElement(Ze,null)))}i.a.render(n.a.createElement(qe,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},96:function(e,t,a){}},[[120,1,2]]]);
//# sourceMappingURL=main.0d2f3ae8.chunk.js.map