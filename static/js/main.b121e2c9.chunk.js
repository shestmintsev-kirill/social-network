(this["webpackJsonpreact-app"]=this["webpackJsonpreact-app"]||[]).push([[0],{106:function(e,t,n){"use strict";n.d(t,"b",(function(){return u}));var r=n(10),a=n(3),c="SEND_MESSAGE",s={dialogs:[{id:1,name:"Dimych"},{id:2,name:"Andrew"},{id:3,name:"Sveta"},{id:4,name:"Sasha"},{id:5,name:"Viktor"},{id:6,name:"Valera"}],messages:[{id:1,message:"Hi"},{id:2,message:"How is your it-kamasutra?"},{id:3,message:"Yo"},{id:4,message:"Yo"},{id:5,message:"Yo"}]},u=function(e){return{type:c,message:e}};t.a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:s,t=arguments.length>1?arguments[1]:void 0;return t.type===c?Object(a.a)(Object(a.a)({},e),{},{messages:[].concat(Object(r.a)(e.messages),[{id:6,message:t.message}])}):e}},110:function(e,t,n){e.exports={preloader:"Preloader_preloader__2bI7Q"}},111:function(e,t,n){e.exports={avatarWrapper:"Users_avatarWrapper__24Btg"}},124:function(e,t,n){},125:function(e,t,n){},14:function(e,t,n){"use strict";n.d(t,"c",(function(){return i})),n.d(t,"b",(function(){return l})),n.d(t,"a",(function(){return p}));var r=n(3),a=n(2),c=n.n(a),s=n(4),u=n(109),o=n.n(u).a.create({withCredentials:!0,baseURL:"https://social-network.samuraijs.com/api/1.0/",headers:{"API-KEY":"8c4c198e-8707-4939-9726-3f8457232010"}}),i={getUsers:function(){var e=arguments;return Object(s.a)(c.a.mark((function t(){var n,r,a;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.length>0&&void 0!==e[0]?e[0]:1,r=e.length>1&&void 0!==e[1]?e[1]:10,t.next=4,o.get("users",{params:{count:r,page:n}});case 4:return a=t.sent,t.abrupt("return",a.data);case 6:case"end":return t.stop()}}),t)})))()},follow:function(e){return Object(s.a)(c.a.mark((function t(){var n;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.post("follow/".concat(e),null);case 2:return n=t.sent,t.abrupt("return",n.data);case 4:case"end":return t.stop()}}),t)})))()},unFollow:function(e){return Object(s.a)(c.a.mark((function t(){var n;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.delete("follow/".concat(e));case 2:return n=t.sent,t.abrupt("return",n.data);case 4:case"end":return t.stop()}}),t)})))()}},l={getUserProfile:function(e){return Object(s.a)(c.a.mark((function t(){var n;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.get("profile/".concat(e));case 2:return n=t.sent,t.abrupt("return",n.data);case 4:case"end":return t.stop()}}),t)})))()},getUserStatus:function(e){return Object(s.a)(c.a.mark((function t(){var n;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.get("profile/status/".concat(e));case 2:return n=t.sent,t.abrupt("return",n.data);case 4:case"end":return t.stop()}}),t)})))()},updateStatus:function(e){return Object(s.a)(c.a.mark((function t(){var n;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,o.put("profile/status/",{status:e});case 3:return n=t.sent,t.abrupt("return",n.data);case 7:t.prev=7,t.t0=t.catch(0),console.log(t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})))()},savePhoto:function(e){return Object(s.a)(c.a.mark((function t(){var n,r;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return(n=new FormData).append("image",e),t.next=4,o.put("profile/photo",n);case 4:return r=t.sent,t.abrupt("return",r.data);case 6:case"end":return t.stop()}}),t)})))()},updateProfile:function(e){return Object(s.a)(c.a.mark((function t(){var n;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.put("profile",Object(r.a)({},e));case 2:return n=t.sent,t.abrupt("return",n.data);case 4:case"end":return t.stop()}}),t)})))()}},p={me:function(){return Object(s.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.get("auth/me");case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})))()},login:function(e){return Object(s.a)(c.a.mark((function t(){var n;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.post("/auth/login",Object(r.a)({},e));case 2:return n=t.sent,t.abrupt("return",n.data);case 4:case"end":return t.stop()}}),t)})))()},logout:function(){return Object(s.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.delete("/auth/login");case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})))()},getCaptcha:function(){return Object(s.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.delete("/security/get-captcha-url");case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))()}}},22:function(e,t,n){e.exports={nav:"Navbar_nav__2zJ_P",item:"Navbar_item__KjAKl",activeLink:"Navbar_activeLink__2F9Rm"}},24:function(e,t,n){e.exports={inputWrapper:"FormsControls_inputWrapper__Qgevo",inputWrapperLow:"FormsControls_inputWrapperLow__3XZUL",input:"FormsControls_input__3jLnb",inputError:"FormsControls_inputError__2Wqmr",error:"FormsControls_error__wCG_K",textarea:"FormsControls_textarea__2x2JD"}},249:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(52),s=n.n(c),u=(n(124),n(5)),o=n(6),i=n(11),l=n(12),p=(n(125),n(22)),d=n.n(p),f=n(18),j=n(1),b=function(){return Object(j.jsxs)("nav",{className:d.a.nav,children:[Object(j.jsx)("div",{className:d.a.item,children:Object(j.jsx)(f.b,{to:"/profile",activeClassName:d.a.activeLink,children:"Profile"})}),Object(j.jsx)("div",{className:"".concat(d.a.item," ").concat(d.a.active),children:Object(j.jsx)(f.b,{to:"/dialogs",activeClassName:d.a.activeLink,children:"Messages"})}),Object(j.jsx)("div",{className:d.a.item,children:Object(j.jsx)(f.b,{to:"/users",activeClassName:d.a.activeLink,children:"Users"})}),Object(j.jsx)("div",{className:d.a.item,children:Object(j.jsx)(f.b,{to:"/friends",activeClassName:d.a.activeLink,children:"Friends"})}),Object(j.jsx)("div",{className:d.a.item,children:Object(j.jsx)(f.b,{to:"/menu",activeClassName:d.a.activeLink,children:"Menu"})})]})},h=n(23),O=n(2),m=n.n(O),g=n(4),v=n(10),x=n(3),k=n(14),w="FOLLOW_UNFOLLOW",z="SET_USERS",y="SET_CURRENT_PAGE",P="SET_TOTAL_USERS_COUNT",T="TOGGLE_IS_FETCHING",S="TOGGLE_IS_FOLLOWING_PR",C={users:[],pageSize:5,totalUsersCount:0,currentPage:1,isFetching:!1,followingInProgress:[]},M=function(e,t){return{type:w,userId:e,followedStatus:t}},R=function(e){return{type:T,isFetching:e}},J=function(e,t){return{type:S,isFetching:e,userId:t}},N=function(){var e=Object(g.a)(m.a.mark((function e(t,n,r,a){return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t(J(!0,n)),e.next=3,r(n);case 3:0===e.sent.resultCode&&t(M(n,a)),t(J(!1,n));case 6:case"end":return e.stop()}}),e)})));return function(t,n,r,a){return e.apply(this,arguments)}}(),I=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:C,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case w:return Object(x.a)(Object(x.a)({},e),{},{users:e.users.map((function(e){return e.id===t.userId?Object(x.a)(Object(x.a)({},e),{},{followed:t.followedStatus}):e}))});case z:return Object(x.a)(Object(x.a)({},e),{},{users:Object(v.a)(t.users)});case y:return Object(x.a)(Object(x.a)({},e),{},{currentPage:t.page});case P:return Object(x.a)(Object(x.a)({},e),{},{totalUsersCount:t.count});case T:return Object(x.a)(Object(x.a)({},e),{},{isFetching:t.isFetching});case S:return Object(x.a)(Object(x.a)({},e),{},{followingInProgress:t.isFetching?[].concat(Object(v.a)(e.followingInProgress),[t.userId]):e.followingInProgress.filter((function(e){return e!==t.userId}))});default:return e}},H=n(29),Z=n(119),F=n(70),A=n.n(F),E=["portionSize"],L=function(e){for(var t=e.portionSize,n=void 0===t?10:t,a=Object(Z.a)(e,E),c=Math.ceil(a.totalUsersCount/a.pageSize),s=Math.ceil(c/n),u=Object(r.useState)(1),o=Object(H.a)(u,2),i=o[0],l=o[1],p=(i-1)*n+1,d=i*n,f=[],b=1;b<=c;b++)f.push(b);return Object(j.jsxs)("div",{children:[i>1&&Object(j.jsx)("button",{onClick:function(){l(1),a.onPageChanged(1)},children:"<<"}),i>1&&Object(j.jsx)("button",{onClick:function(){a.onPageChanged(p-1),l(i-1)},children:"<"}),a.currentPage>1&&Object(j.jsx)("button",{onClick:function(){a.currentPage-1<p&&l(i-1),a.onPageChanged(a.currentPage-1)},children:"Prev"}),f.filter((function(e){return e>=p&&e<=d})).map((function(e){return Object(j.jsx)("span",{onClick:function(){a.onPageChanged(e)},className:"".concat(A.a.page," ").concat(a.currentPage===e&&A.a.activePage),children:e},e)})),c!==a.currentPage&&Object(j.jsx)("button",{onClick:function(){a.currentPage+1>d&&l(i+1),a.onPageChanged(a.currentPage+1)},children:"Next"}),s>i&&Object(j.jsx)("button",{onClick:function(){a.onPageChanged(d+1),l(i+1)},children:">"}),s>i&&Object(j.jsx)("button",{onClick:function(){l(s),a.onPageChanged(c)},children:">>"})]})},X=n(42),D=n(111),U=n.n(D),W=function(e){var t=e.user,n=e.followingInProgress,r=e.unFollow,a=e.follow;return Object(j.jsxs)("div",{children:[Object(j.jsxs)("div",{children:[Object(j.jsx)("div",{className:U.a.avatarWrapper,children:Object(j.jsx)(f.b,{to:"/profile/"+t.id,children:Object(j.jsx)("img",{src:t.photos.small?t.photos.small:"data:image/png;base64,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",alt:"user"})})}),Object(j.jsx)("div",{children:t.followed?Object(j.jsx)("button",{disabled:n.some((function(e){return e===t.id})),onClick:function(){r(t.id)},children:"Unfollow"}):Object(j.jsx)("button",{disabled:n.some((function(e){return e===t.id})),onClick:function(){a(t.id)},children:"Follow"})})]}),Object(j.jsx)("div",{children:Object(j.jsxs)("div",{children:[Object(j.jsx)("div",{children:t.name}),Object(j.jsx)("div",{children:t.status})]})})]})},Q=function(e){return Object(j.jsxs)("div",{children:[Object(j.jsx)(L,{currentPage:e.currentPage,onPageChanged:e.onPageChanged,totalUsersCount:e.totalUsersCount,pageSize:e.pageSize}),e.isFetching&&Object(j.jsx)(X.a,{}),!e.isFetching&&e.users.map((function(t){return Object(j.jsx)(W,{user:t,followingInProgress:e.followingInProgress,unFollow:e.unFollow,follow:e.follow},t.id)}))]})},G=n(33),Y=n(118),B=Object(Y.a)((function(e){return e.usersPage.users}),(function(e){return e.filter((function(e){return!0}))})),V=function(e){return e.usersPage.pageSize},K=function(e){return e.usersPage.totalUsersCount},q=function(e){return e.usersPage.currentPage},_=function(e){return e.usersPage.isFetching},$=function(e){return e.usersPage.followingInProgress},ee=function(e){Object(i.a)(n,e);var t=Object(l.a)(n);function n(){var e;Object(u.a)(this,n);for(var r=arguments.length,a=new Array(r),c=0;c<r;c++)a[c]=arguments[c];return(e=t.call.apply(t,[this].concat(a))).onPageChanged=function(t){e.props.getUsers(t,e.props.pageSize)},e}return Object(o.a)(n,[{key:"componentDidMount",value:function(){this.props.getUsers(this.props.currentPage,this.props.pageSize)}},{key:"render",value:function(){return Object(j.jsx)("div",{children:Object(j.jsx)(Q,{isFetching:this.props.isFetching,totalUsersCount:this.props.totalUsersCount,pageSize:this.props.pageSize,currentPage:this.props.currentPage,users:this.props.users,follow:this.props.follow,unFollow:this.props.unFollow,onPageChanged:this.onPageChanged,followingInProgress:this.props.followingInProgress,toggleFollowingProgress:this.props.toggleFollowingProgress})})}}]),n}(a.a.Component),te=Object(G.c)(Object(h.b)((function(e){return{users:B(e),pageSize:V(e),totalUsersCount:K(e),currentPage:q(e),isFetching:_(e),followingInProgress:$(e)}}),{follow:function(e){return function(){var t=Object(g.a)(m.a.mark((function t(n){return m.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:N(n,e,k.c.follow.bind(k.c),!0);case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},unFollow:function(e){return function(){var t=Object(g.a)(m.a.mark((function t(n){return m.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:N(n,e,k.c.unFollow.bind(k.c),!1);case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},toggleFollowingProgress:J,getUsers:function(e,t){return function(){var n=Object(g.a)(m.a.mark((function n(r){var a;return m.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r(R(!0)),r({type:y,page:e}),n.next=4,k.c.getUsers(e,t);case 4:a=n.sent,r((s=a.items,{type:z,users:s})),r((c=a.totalCount,{type:P,count:c})),r(R(!1));case 8:case"end":return n.stop()}var c,s}),n)})));return function(e){return n.apply(this,arguments)}}()}}))(ee),ne=n(9),re=n(71),ae=n.n(re),ce=function(e){var t=Object(ne.g)(),n=function(){var n=Object(g.a)(m.a.mark((function n(){return m.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.logout();case 2:t.push("/login");case 3:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}();return Object(j.jsxs)("header",{className:ae.a.header,children:[Object(j.jsx)("img",{src:"https://mobimg.b-cdn.net/v3/fetch/37/37c2f087ed4c046e861e7be72452eb32.jpeg",alt:"logo"}),Object(j.jsx)("div",{className:ae.a.loginBlock,children:e.isAuth?Object(j.jsxs)("div",{children:[e.login,Object(j.jsx)("button",{onClick:n,children:"Log out"})]}):Object(j.jsx)(f.b,{to:"/login",children:"Login"})})]})},se="network/auth/SET_USER_DATA",ue="network/auth/SET_ERROR",oe="network/auth/SET_CAPTCHA",ie="network/auth/SET_LOGOUT_USER_DATA",le={userId:null,email:null,login:null,isAuth:!1,errorMessage:null,captcha:null},pe=function(e,t,n,r){return{type:se,payload:{userId:e,email:t,login:n,isAuth:r}}},de=function(e){return{type:oe,captcha:e}},fe=function(){return function(){var e=Object(g.a)(m.a.mark((function e(t){var n,r,a,c,s;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,k.a.me();case 2:0===(n=e.sent).resultCode&&(r=n.data,a=r.id,c=r.login,s=r.email,t(pe(a,s,c,!0)));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},je=function(){return function(){var e=Object(g.a)(m.a.mark((function e(t){var n;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,k.a.getCaptcha();case 2:n=e.sent,t(de(n.data.url));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},be=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:le,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case se:return Object(x.a)(Object(x.a)({},e),t.payload);case ie:return Object(x.a)({},le);case ue:return Object(x.a)(Object(x.a)({},e),{},{errorMessage:t.error});case oe:return Object(x.a)(Object(x.a)({},e),{},{captcha:t.captcha});default:return e}},he=function(e){Object(i.a)(n,e);var t=Object(l.a)(n);function n(){return Object(u.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"render",value:function(){return Object(j.jsx)(ce,Object(x.a)({},this.props))}}]),n}(a.a.Component),Oe=Object(h.b)((function(e){return{isAuth:e.auth.isAuth,login:e.auth.login}}),{logout:function(){return function(){var e=Object(g.a)(m.a.mark((function e(t){return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,k.a.logout();case 2:0===e.sent.resultCode&&t({type:ie});case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}})(he),me=n(73),ge=n(35),ve=n(58),xe=function(e){var t=ge.a().shape({email:ge.c().email("\u041d\u0435 \u0432\u0430\u043b\u0438\u0434\u043d\u044b\u0439 email").required("\u041b\u043e\u0433\u0438\u043d \u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u0435\u043d"),password:ge.c().typeError("\u0414\u043e\u043b\u0436\u043d\u043e \u0431\u044b\u0442\u044c \u0441\u0442\u0440\u043e\u043a\u043e\u0439").max(15,"Must be 15 characters or less").required("\u041f\u0430\u0440\u043e\u043b\u044c \u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u0435\u043d"),confirmPassword:ge.c().oneOf([ge.b("password")],"\u041f\u0430\u0440\u043e\u043b\u0438 \u043d\u0435 \u0441\u043e\u0432\u043f\u0430\u0434\u0430\u044e\u0442").required("\u041f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043d\u0438\u0435 \u043f\u0430\u0440\u043e\u043b\u044f \u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u043e"),captcha:e.captcha&&ge.c().required("\u041f\u043e\u043b\u0435 \u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u043e")}),n=Object(me.a)({initialValues:{email:"",password:"",confirmPassword:"",captcha:"",rememberMe:!1},onSubmit:function(t,n){n.resetForm;e.authLogin(t),t.captcha=""},validationSchema:t});return Object(j.jsxs)("form",{onSubmit:n.handleSubmit,children:[[{name:"email",title:"\u041b\u043e\u0433\u0438\u043d",placeholder:"Login",type:"text"},{name:"password",title:"\u041f\u0430\u0440\u043e\u043b\u044c",placeholder:"Password",type:"password"},{name:"confirmPassword",title:"\u041f\u043e\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0435 \u041f\u0430\u0440\u043e\u043b\u044c",placeholder:"Confirm password",type:"password"}].map((function(e,t){return Object(j.jsx)(ve.a,{title:e.title,type:e.type,placeholder:e.placeholder,name:e.name,onChange:n.handleChange,onBlur:n.handleBlur,value:n.values[e.name],touched:n.touched[e.name],errors:n.errors[e.name]},t)})),Object(j.jsxs)("div",{children:[Object(j.jsx)("input",{checked:n.values.rememberMe,name:"rememberMe",onChange:n.handleChange,type:"checkbox"})," remember me"]}),e.captcha&&Object(j.jsxs)("div",{children:[Object(j.jsx)("img",{src:e.captcha,alt:"captcha"}),Object(j.jsx)(ve.a,{type:"text",name:"captcha",value:n.values.captcha,onBlur:n.handleBlur,onChange:n.handleChange,placeholder:"input captcha"})]}),Object(j.jsxs)("div",{children:[Object(j.jsx)("p",{style:{color:"red"},children:e.errorMessage}),Object(j.jsx)("button",{disabled:!n.dirty||!n.isValid,type:"submit",children:"Login"})]})]})},ke=Object(h.b)((function(e){return{isAuth:e.auth.isAuth,errorMessage:e.auth.errorMessage,captcha:e.auth.captcha}}),{login:function(e){return function(){var t=Object(g.a)(m.a.mark((function t(n){var r;return m.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,k.a.login(e);case 2:0===(r=t.sent).resultCode?n(fe()):(n((a=r.messages.length?r.messages[0]:"Some error",{type:ue,error:a})),!r.fieldsErrors.length&&n(de(null)),10===r.resultCode&&r.fieldsErrors.length&&n(je()));case 4:case"end":return t.stop()}var a}),t)})));return function(e){return t.apply(this,arguments)}}()}})((function(e){if(e.isAuth)return Object(j.jsx)(ne.a,{to:"/profile"});return Object(j.jsxs)("div",{children:[Object(j.jsx)("h1",{children:"Login"}),Object(j.jsx)(xe,{authLogin:function(t){var n=Object(x.a)({},t);for(var r in n)"confirmPassword"===r&&delete n[r];e.login(n)},errorMessage:e.errorMessage,captcha:e.captcha})]})})),we="SET_INITIALIZE",ze={initialized:!1},ye=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ze,t=arguments.length>1?arguments[1]:void 0;return t.type===we?Object(x.a)(Object(x.a)({},e),{},{initialized:!0}):e},Pe=a.a.lazy((function(){return n.e(4).then(n.bind(null,256))})),Te=a.a.lazy((function(){return n.e(3).then(n.bind(null,255))})),Se=function(e){Object(i.a)(n,e);var t=Object(l.a)(n);function n(){return Object(u.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"componentDidMount",value:function(){this.props.initializeApp()}},{key:"render",value:function(){return this.props.initialized?Object(j.jsxs)("div",{className:"app-wrapper",children:[Object(j.jsx)(Oe,{}),Object(j.jsx)(b,{}),Object(j.jsx)("main",{className:"app-wrapper-content",children:Object(j.jsx)(r.Suspense,{fallback:Object(j.jsx)(X.a,{}),children:Object(j.jsxs)(ne.d,{children:[Object(j.jsx)(ne.b,{exact:!0,path:"/",children:Object(j.jsx)(ne.a,{from:"/",to:"/profile"})}),Object(j.jsx)(ne.b,{path:"/dialogs",children:Object(j.jsx)(Pe,{})}),Object(j.jsx)(ne.b,{path:"/profile/:userId?",children:Object(j.jsx)(Te,{})}),Object(j.jsx)(ne.b,{path:"/users",children:Object(j.jsx)(te,{})}),Object(j.jsx)(ne.b,{path:"/login",children:Object(j.jsx)(ke,{})}),Object(j.jsx)(ne.b,{path:"*",children:Object(j.jsx)("div",{children:"404 not found"})})]})})})]}):Object(j.jsx)(X.a,{})}}]),n}(a.a.Component),Ce=Object(h.b)((function(e){return{initialized:e.app.initialized}}),{initializeApp:function(){return function(){var e=Object(g.a)(m.a.mark((function e(t){return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t(fe());case 2:t({type:we});case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}})(Se),Me=function(e){e&&e instanceof Function&&n.e(5).then(n.bind(null,254)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,c=t.getLCP,s=t.getTTFB;n(e),r(e),a(e),c(e),s(e)}))},Re=n(74),Je=n(106),Ne={},Ie=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ne;return e},He=n(117),Ze=Object(G.b)({profilePage:Re.b,dialogsPage:Je.a,usersPage:I,auth:be,sidebar:Ie,app:ye}),Fe=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||G.c,Ae=Object(G.d)(Ze,Fe(Object(G.a)(He.a)));window.__store__=Ae;var Ee=Ae;s.a.render(Object(j.jsx)(f.a,{children:Object(j.jsx)(h.a,{store:Ee,children:Object(j.jsx)(Ce,{})})}),document.getElementById("root")),Me()},42:function(e,t,n){"use strict";var r=n(110),a=n.n(r),c=n.p+"static/media/preloader.86c721f1.svg",s=n(1);t.a=function(e){return Object(s.jsx)("div",{className:a.a.preloader,children:Object(s.jsx)("img",{src:c,alt:"preloader"})})}},58:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return i}));var r=n(3),a=n(24),c=n.n(a),s=n(1),u=function(e){return Object(s.jsxs)("div",{className:c.a.inputWrapper,children:[Object(s.jsx)("label",{htmlFor:e.htmlFor,children:e.title}),Object(s.jsx)("br",{}),Object(s.jsx)("input",{className:"".concat(c.a.input," ").concat(e.touched&&e.errors&&c.a.inputError),type:e.type,placeholder:e.placeholder,name:e.name,onChange:e.onChange,onBlur:e.onBlur,value:e.value}),e.touched&&e.errors&&Object(s.jsx)("p",{className:c.a.error,children:e.errors})]})},o=function(e){return Object(s.jsxs)("div",{className:c.a.inputWrapperLow,children:[Object(s.jsx)("label",{htmlFor:e.htmlFor,style:{color:e.isError&&"red"},children:e.title}),Object(s.jsx)("br",{}),Object(s.jsx)("input",{className:"".concat(c.a.input," ").concat(e.isError&&c.a.inputError),type:e.type,placeholder:e.placeholder,name:e.name,onChange:e.onChange,onBlur:e.onBlur,value:e.value}),e.touched&&e.errors&&Object(s.jsx)("p",{className:c.a.error,children:e.errors})]})},i=function(e){return Object(s.jsx)("div",{children:Object(s.jsx)("textarea",Object(r.a)({className:c.a.textarea},e))})}},70:function(e,t,n){e.exports={activePage:"Pagination_activePage__1Gjgr",page:"Pagination_page__3m1mQ"}},71:function(e,t,n){e.exports={header:"Header_header__3B2sN",loginBlock:"Header_loginBlock__3tsyg"}},74:function(e,t,n){"use strict";n.d(t,"a",(function(){return h})),n.d(t,"d",(function(){return g})),n.d(t,"c",(function(){return v})),n.d(t,"g",(function(){return x})),n.d(t,"e",(function(){return k})),n.d(t,"f",(function(){return w}));var r=n(2),a=n.n(r),c=n(4),s=n(10),u=n(3),o=n(14),i="ADD_POST",l="SET_USER_PROFILE",p="SET_STATUS",d="DELETE_POST",f="SEVE_PHOTO_SUCCESS",j="SET_ERROR",b={posts:[{id:1,message:"Hi, how are you?",likesCount:12},{id:2,message:"It's my first post",likesCount:11},{id:3,message:"Blabla",likesCount:11},{id:4,message:"Dada",likesCount:11}],newPostText:"it-kamasutra.com",profile:null,status:"",errors:[]},h=function(e){return{type:i,post:e}},O=function(e){return{type:p,status:e}},m=function(e){return{type:j,err:e}},g=function(e){return function(){var t=Object(c.a)(a.a.mark((function t(n){var r;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.b.getUserProfile(e);case 2:r=t.sent,n({type:l,profile:r});case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},v=function(e){return function(){var t=Object(c.a)(a.a.mark((function t(n){var r;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.b.getUserStatus(e);case 2:r=t.sent,n(O(r));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},x=function(e){return function(){var t=Object(c.a)(a.a.mark((function t(n){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.b.updateStatus(e);case 2:0===t.sent.resultCode&&n(O(e));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},k=function(e){return function(){var t=Object(c.a)(a.a.mark((function t(n){var r;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.b.savePhoto(e);case 2:0===(r=t.sent).resultCode&&n((a=r.data.photos,{type:f,photos:a}));case 4:case"end":return t.stop()}var a}),t)})));return function(e){return t.apply(this,arguments)}}()},w=function(e){return function(){var t=Object(c.a)(a.a.mark((function t(n){var r;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.b.updateProfile(e);case 2:0===(r=t.sent).resultCode?(n(g(e.userId)),n(m([]))):n(m(r.messages));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()};t.b=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:b,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case i:var n={id:5,message:t.post,likesCount:0};return Object(u.a)(Object(u.a)({},e),{},{posts:[].concat(Object(s.a)(e.posts),[n]),newPostText:""});case l:return Object(u.a)(Object(u.a)({},e),{},{profile:t.profile});case p:return Object(u.a)(Object(u.a)({},e),{},{status:t.status});case f:return Object(u.a)(Object(u.a)({},e),{},{profile:Object(u.a)(Object(u.a)({},e.profile),{},{photos:t.photos})});case j:return Object(u.a)(Object(u.a)({},e),{},{errors:t.err});case d:return Object(u.a)(Object(u.a)({},e),{},{posts:e.posts.filter((function(e){return e.id!==t.postId}))});default:return e}}}},[[249,1,2]]]);
//# sourceMappingURL=main.b121e2c9.chunk.js.map