(this["webpackJsonpreact-app"]=this["webpackJsonpreact-app"]||[]).push([[3],{251:function(t,e,s){t.exports={postsBlock:"MyPosts_postsBlock__3BStp",posts:"MyPosts_posts__2Eaxb"}},252:function(t,e,s){t.exports={item:"Post_item__1myGU"}},253:function(t,e,s){t.exports={descriptionBlock:"ProfileInfo_descriptionBlock__yZg9c"}},255:function(t,e,s){"use strict";s.r(e);var o=s(2),n=s(3),i=s(4),c=s(10),a=s(11),r=s(0),u=s.n(r),l=s(23),p=s(73),d=s(74),j=s(72),b=s(251),h=s.n(b),O=s(252),f=s.n(O),v=s(1),x=function(t){return Object(v.jsxs)("div",{className:f.a.item,children:[Object(v.jsx)("img",{src:"https://cdn-icons-png.flaticon.com/512/149/149071.png",alt:""}),t.message,Object(v.jsxs)("div",{children:[Object(v.jsx)("span",{children:"like"})," ",t.likesCount]})]})},m=function(t){var e=Object(d.a)({initialValues:{post:""},onSubmit:function(e,s){var o=s.resetForm;t.addNewPost(e),o()}});return Object(v.jsxs)("form",{onSubmit:e.handleSubmit,children:[Object(v.jsx)(j.b,{name:"post",onBlur:e.handleBlur,onChange:e.handleChange,value:e.values.post,placeholder:"Enter your post"}),Object(v.jsx)("div",{children:Object(v.jsx)("button",{disabled:!e.dirty,type:"submit",children:"Add post"})})]})},g=function(t){var e=t.posts.map((function(t,e){return Object(v.jsx)(x,{message:t.message,likesCount:t.likesCount},e)}));return Object(v.jsxs)("div",{className:h.a.postsBlock,children:[Object(v.jsx)("h3",{children:"My posts"}),Object(v.jsx)("div",{children:Object(v.jsx)(m,{addNewPost:function(e){t.addPost(e.post)}})}),Object(v.jsx)("div",{className:h.a.posts,children:e})]})},k=Object(l.b)((function(t){return{posts:t.profilePage.posts,newPostText:t.profilePage.newPostText}}),{addPost:p.a})(g),P=s(42),S=s(253),y=s.n(S),_=s(29),B=function(t){var e=Object(r.useState)(!1),s=Object(_.a)(e,2),o=s[0],n=s[1],i=Object(r.useState)(t.status),c=Object(_.a)(i,2),a=c[0],u=c[1];Object(r.useEffect)((function(){u(t.status)}),[t.status]);return Object(v.jsx)("div",{children:o?Object(v.jsxs)("div",{children:["\u0421\u0442\u0430\u0442\u0443\u0441: ",Object(v.jsx)("input",{onChange:function(t){u(t.target.value)},onBlur:function(){n(!1),t.updateStatus(a)},autoFocus:!0,type:"text",value:a})]}):Object(v.jsx)("div",{children:Object(v.jsxs)("span",{onDoubleClick:function(){n(!0)},children:["\u0421\u0442\u0430\u0442\u0443\u0441: ",t.status||"\u041d\u0435\u0442 \u0441\u0442\u0430\u0442\u0443\u0441\u0430"]})})})},w=function(t){var e,s,o=t.profile,n=t.status,i=t.updateStatus;return o?Object(v.jsxs)("div",{children:[Object(v.jsx)("div",{className:y.a.descriptionBlock,children:Object(v.jsx)("img",{src:(null===o||void 0===o||null===(e=o.photos)||void 0===e?void 0:e.large)?null===o||void 0===o||null===(s=o.photos)||void 0===s?void 0:s.large:"https://www.kindpng.com/picc/m/130-1300217_user-icon-member-icon-png-transparent-png.png",alt:"avatar"})}),Object(v.jsxs)("p",{children:["\u0418\u043c\u044f: ",null===o||void 0===o?void 0:o.fullName]}),Object(v.jsx)(B,{status:n,updateStatus:i}),(null===o||void 0===o?void 0:o.aboutMe)&&Object(v.jsxs)("p",{children:["\u041e\u0431\u043e \u043c\u043d\u0435: ",null===o||void 0===o?void 0:o.aboutMe]}),(null===o||void 0===o?void 0:o.lookingForAJob)&&Object(v.jsxs)("p",{children:["\u0412 \u043f\u043e\u0438\u0441\u043a\u0435 \u0440\u0430\u0431\u043e\u0442\u044b: ",null===o||void 0===o?void 0:o.lookingForAJobDescription]})]}):Object(v.jsx)(P.a,{})},C=function(t){return Object(v.jsxs)("div",{children:[Object(v.jsx)(w,{profile:t.profile,status:t.status,updateStatus:t.updateStatus}),Object(v.jsx)(k,{})]})},N=s(8),M=s(25),A=function(t){Object(c.a)(s,t);var e=Object(a.a)(s);function s(){return Object(n.a)(this,s),e.apply(this,arguments)}return Object(i.a)(s,[{key:"componentDidMount",value:function(){var t,e=null!==(t=this.props.match.params.userId)&&void 0!==t?t:this.props.authorizedUserId;e?(this.props.getUserProfile(e),this.props.getStatus(e)):this.props.history.push("/login")}},{key:"render",value:function(){return Object(v.jsx)(C,Object(o.a)(Object(o.a)({},this.props),{},{profile:this.props.profile,status:this.props.status,updateStatus:this.props.updateStatus}))}}]),s}(u.a.Component);e.default=Object(M.c)(Object(l.b)((function(t){return{profile:t.profilePage.profile,status:t.profilePage.status,authorizedUserId:t.auth.userId,isAuth:t.auth.isAuth}}),{getUserProfile:p.d,getStatus:p.c,updateStatus:p.e}),N.f)(A)}}]);
//# sourceMappingURL=3.1259f8b3.chunk.js.map