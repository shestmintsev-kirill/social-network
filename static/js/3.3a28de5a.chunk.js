(this["webpackJsonpreact-app"]=this["webpackJsonpreact-app"]||[]).push([[3],{346:function(e,t,o){e.exports={postsBlock:"MyPosts_postsBlock__3BStp",posts:"MyPosts_posts__2Eaxb"}},347:function(e,t,o){e.exports={item:"Post_item__1myGU"}},348:function(e,t,o){e.exports={avatar:"ProfileInfo_avatar__1Tzcz"}},350:function(e,t,o){"use strict";o.r(t);var s=o(21),n=o(22),r=o(32),i=o(33),a=o(0),c=o.n(a),u=o(18),l=o(133),d=o(87),p=o(112),j=o(346),h=o.n(j),b=o(347),f=o.n(b),O=o(4),v=function(e){return Object(O.jsxs)("div",{className:f.a.item,children:[Object(O.jsx)("img",{src:"https://cdn-icons-png.flaticon.com/512/149/149071.png",alt:"user"}),e.message,Object(O.jsxs)("div",{children:[Object(O.jsx)("span",{children:"like"})," ",e.likesCount]})]})},g=function(e){var t=Object(d.a)({initialValues:{post:""},onSubmit:function(t,o){var s=o.resetForm;e.addNewPost(t),s()}});return Object(O.jsxs)("form",{onSubmit:t.handleSubmit,children:[Object(O.jsx)(p.c,{name:"post",onBlur:t.handleBlur,onChange:t.handleChange,value:t.values.post,placeholder:"Enter your post"}),Object(O.jsx)("div",{children:Object(O.jsx)("button",{disabled:!t.dirty,type:"submit",children:"Add post"})})]})},x=function(e){var t=e.posts.map((function(e,t){return Object(O.jsx)(v,{message:e.message,likesCount:e.likesCount},t)}));return Object(O.jsxs)("div",{className:h.a.postsBlock,children:[Object(O.jsx)("h3",{children:"My posts"}),Object(O.jsx)("div",{children:Object(O.jsx)(g,{addNewPost:function(t){e.addPost(t.post)}})}),Object(O.jsx)("div",{className:h.a.posts,children:t})]})},m=Object(u.b)((function(e){return{posts:e.profilePage.posts,newPostText:e.profilePage.newPostText}}),{addPost:l.a.addPost})(x),k=o(57),P=o(83),w=o(7),C=o.n(w),y=o(8),S=o(10),A=function(e){var t=e.contacts,o=e.onChange,s=e.errors;console.log(t,o,s);var n=s.map((function(e){return e.split("->")[1].replace(")","").toLowerCase()}));return Object(O.jsx)("div",{children:Object.keys(t).map((function(e){return Object(O.jsx)(p.b,{title:e,isError:n.some((function(t){return t===e.toLowerCase()})),name:"contacts.".concat(e),onChange:o,value:t[e],placeholder:e},e)}))})},I=function(e){var t=e.profile,o=e.closeEditMode,s=e.updateProfile,n=e.authorizedUserId,r=e.errors,i=function(e){return e.length?e:""},a=Object(d.a)({initialValues:{fullName:t.fullName,aboutMe:i(t.aboutMe),lookingForAJob:t.lookingForAJob,lookingForAJobDescription:i(t.lookingForAJobDescription),contacts:{facebook:i(t.contacts.facebook),github:i(t.contacts.github),instagram:i(t.contacts.instagram),mainLink:i(t.contacts.mainLink),twitter:i(t.contacts.twitter),vk:i(t.contacts.vk),website:i(t.contacts.website),youtube:i(t.contacts.youtube)}},onSubmit:function(){var e=Object(S.a)(C.a.mark((function e(t){return C.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s(Object(y.a)(Object(y.a)({},t),{},{userId:n}));case 2:o();case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()});return Object(O.jsxs)("form",{onSubmit:a.handleSubmit,children:[Object(O.jsx)(p.a,{title:"\u0418\u043c\u044f",name:"fullName",onChange:a.handleChange,value:a.values.fullName,placeholder:"fullName"}),Object(O.jsx)(p.a,{title:"\u041e\u0431\u043e \u043c\u043d\u0435",name:"aboutMe",onChange:a.handleChange,value:a.values.aboutMe,placeholder:"aboutMe"}),Object(O.jsx)("input",{name:"lookingForAJob",checked:a.values.lookingForAJob,onChange:a.handleChange,type:"checkbox"})," ","looking For A Job",a.values.lookingForAJob&&Object(O.jsx)(p.a,{title:"\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435 \u0434\u043b\u044f \u043f\u043e\u0438\u0441\u043a\u0430 \u0440\u0430\u0431\u043e\u0442\u044b",name:"lookingForAJobDescription",onChange:a.handleChange,value:a.values.lookingForAJobDescription,placeholder:"looking For A Job Description"}),Object(O.jsx)(A,{contacts:a.values.contacts,onChange:a.handleChange,errors:r}),Object(O.jsx)("div",{children:Object(O.jsx)("button",{type:"submit",children:"Send"})}),!!r.length&&r.map((function(e,t){return Object(O.jsxs)("div",{style:{color:"red"},children:[Object(O.jsx)("strong",{children:"\u041e\u0448\u0438\u0431\u043a\u0430: "}),e]},t)}))]})},F=o(348),J=o.n(F),M=o(131),U=function(e){var t=e.status,o=e.isOwner,s=void 0!==o&&o,n=e.updateStatus,r=void 0===n?function(e){return e}:n,i=Object(a.useState)(!1),c=Object(k.a)(i,2),u=c[0],l=c[1],d=Object(a.useState)(t),p=Object(k.a)(d,2),j=p[0],h=p[1];Object(a.useEffect)((function(){h(t)}),[t]);return Object(O.jsx)("div",{children:u?Object(O.jsxs)("div",{children:["\u0421\u0442\u0430\u0442\u0443\u0441:"," ",Object(O.jsx)(M.a,{onChange:function(e){h(e.target.value)},onBlur:function(){l(!1),r(j)},autoFocus:!0,type:"text",value:j})]}):Object(O.jsx)("div",{children:Object(O.jsxs)("span",{onDoubleClick:function(){s&&l(!0)},children:[Object(O.jsx)("strong",{children:"\u0421\u0442\u0430\u0442\u0443\u0441:"})," ",t||"\u041d\u0435\u0442 \u0441\u0442\u0430\u0442\u0443\u0441\u0430"]})})})},_=function(e){var t=e.profile,o=e.isOwner,s=e.goToEditMode,n=Object.entries(null===t||void 0===t?void 0:t.contacts).map((function(e,t){return!!e[1]&&Object(O.jsxs)("li",{children:[Object(O.jsxs)("strong",{children:[e[0],": "]}),e[1]]},t)}));return Object(O.jsxs)("form",{children:[o&&Object(O.jsx)("button",{onClick:s,children:"Edit profile"}),Object(O.jsxs)("p",{children:[Object(O.jsx)("strong",{children:"\u0418\u043c\u044f:"})," ",null===t||void 0===t?void 0:t.fullName]}),(null===t||void 0===t?void 0:t.aboutMe)&&Object(O.jsxs)("p",{children:[Object(O.jsx)("strong",{children:"\u041e\u0431\u043e \u043c\u043d\u0435: "}),null===t||void 0===t?void 0:t.aboutMe]}),(null===t||void 0===t?void 0:t.lookingForAJob)&&Object(O.jsxs)("p",{children:[Object(O.jsx)("strong",{children:"\u0412 \u043f\u043e\u0438\u0441\u043a\u0435 \u0440\u0430\u0431\u043e\u0442\u044b: "}),null===t||void 0===t?void 0:t.lookingForAJobDescription]}),Object(O.jsx)("ul",{children:n})]})},N=function(e){var t,o=e.profile,s=e.status,n=e.updateStatus,r=e.isOwner,i=e.savePhoto,c=e.updateProfile,u=e.authorizedUserId,l=e.errors,d=Object(a.useState)(!1),p=Object(k.a)(d,2),j=p[0],h=p[1];Object(a.useEffect)((function(){l.length&&h(!0)}),[l,u]);return o?Object(O.jsxs)("div",{children:[Object(O.jsxs)("div",{className:J.a.avatar,children:[Object(O.jsx)("img",{src:(null===o||void 0===o||null===(t=o.photos)||void 0===t?void 0:t.large)||"https://www.kindpng.com/picc/m/130-1300217_user-icon-member-icon-png-transparent-png.png",alt:"avatar"}),r&&j&&Object(O.jsx)("input",{type:"file",accept:".png, .jpg, .jpeg",onChange:function(e){var t;(null===(t=e.target.files)||void 0===t?void 0:t.length)&&i(e.target.files[0])}})]}),j?Object(O.jsx)(I,{errors:l,authorizedUserId:u,updateProfile:c,profile:o,closeEditMode:function(){return h(!1)}}):Object(O.jsx)(_,{profile:o,isOwner:r,goToEditMode:function(){return h(!0)}}),Object(O.jsx)(U,{status:s,updateStatus:n,isOwner:r})]}):Object(O.jsx)(P.a,{})},z=function(e){return Object(O.jsxs)("div",{children:[Object(O.jsx)(N,{isOwner:e.isOwner,profile:e.profile,status:e.status,updateStatus:e.updateStatus,savePhoto:e.savePhoto,updateProfile:e.updateProfile,authorizedUserId:e.authorizedUserId,errors:e.errors}),Object(O.jsx)(m,{})]})},E=o(24),D=o(82),B=function(e){Object(r.a)(o,e);var t=Object(i.a)(o);function o(){return Object(s.a)(this,o),t.apply(this,arguments)}return Object(n.a)(o,[{key:"refreshProfile",value:function(){var e,t=null!==(e=this.props.match.params.userId)&&void 0!==e?e:this.props.authorizedUserId;t?(this.props.getUserProfile(t),this.props.getStatus(t)):this.props.history.push("/login")}},{key:"componentDidMount",value:function(){this.refreshProfile()}},{key:"componentDidUpdate",value:function(e){this.props.match.params.userId!==e.match.params.userId&&this.refreshProfile()}},{key:"render",value:function(){return Object(O.jsx)(z,{isOwner:!this.props.match.params.userId,profile:this.props.profile,status:this.props.status,updateStatus:this.props.updateStatus,savePhoto:this.props.savePhoto,updateProfile:this.props.updateProfile,authorizedUserId:this.props.authorizedUserId,errors:this.props.errors})}}]),o}(c.a.Component);t.default=Object(D.c)(Object(u.b)((function(e){return{profile:e.profilePage.profile,status:e.profilePage.status,authorizedUserId:e.auth.userId,isAuth:e.auth.isAuth,errors:e.profilePage.errors}}),{getUserProfile:l.d,getStatus:l.c,updateStatus:l.g,savePhoto:l.e,updateProfile:l.f}),E.h)(B)}}]);
//# sourceMappingURL=3.3a28de5a.chunk.js.map