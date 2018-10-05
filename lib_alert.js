var arr_Q = {};
var arr_Q_children = [];
var keys_elements = {};
var global_vars = [];
var hot_global_build = {};

function keys(el, keys) {
  keys_elements[keys] = el;
}
function $catch$(e) {
  return document.querySelector(e);
}
function css(e, css) {
  css1 = "";
  for (i in css) {
    css1 += `${i}:${css[i]};`;
  }
  e.style = css1;
}
function addClass(e, cls) {
  if (cls) {
    e.className = cls;
  }
}
function textTo(e, txt) {
  e.innerText = txt;
}
function setState(list) {
  for (i in list) {
    val  = list[i];
    name = i;
    // for change in arr hot_global_build
    for (ii in hot_global_build) {
      for (iii in hot_global_build[ii]){
        name_focus = hot_global_build[ii][iii][2];
        if (name_focus == name) {
          focus_rewrite = hot_global_build[ii][iii][0];
          if (typeof focus_rewrite == "object") {
            focus_rewrite.innerHTML = focus_rewrite.innerHTML.replace(hot_global_build[ii][iii][1], "@"+name_focus);
          } else {
            focus_element_rewrite = arr_Q[ii];
            focus_element_rewrite.setAttribute(
                hot_global_build[ii][iii][0],
              focus_element_rewrite.getAttribute(focus_rewrite).replace(hot_global_build[ii][iii][1],  "@"+name_focus)
              )
              ;
          }
          hot_global_build[ii][iii][1] = val;

        } else continue;
      }

    }
    // for rewrite in vars and attrs;
    for (ii in hot_global_build) {
      for (iiiz in hot_global_build[ii]) {
        focus_rewrite = hot_global_build[ii][iiiz][0];
        focuse_value = hot_global_build[ii][iiiz][1];
        focus_tag_value = hot_global_build[ii][iiiz][2];
        focus_element_rewrite = arr_Q[ii];
        
        if (typeof focus_rewrite == "object") {
          
          focus_rewrite.innerHTML = focuse_value;

        } else {
            // get element for change attrs 

          
          focuse_value = (focus_element_rewrite.getAttribute(focus_rewrite)).replace(`@${focus_tag_value}`, focuse_value);

          focus_element_rewrite.setAttribute(focus_rewrite, focuse_value);
        }
      }
    }
  }

}
function transform_html_vars(e, has_hotreload) {
  for (i in e.children) {
    if (typeof e.children[i] == "object") {
      if (e.children[i].tagName == "VARS") {
        new_end_txt = "";
        transform_need = e.children[i].innerText.split(",");
        for (ii in transform_need) {
            focus_var = transform_need[ii].replace(/ /gi, '');
            for (iii in arr_Q) {
                if (e == arr_Q[iii]){
                    id = iii;
                    for (iiii in global_vars) {
                        if (focus_var ==  iiii) {
                            if (global_vars[iiii][1] == true) {
                                new_end_txt += global_vars[iiii][0];
                                //e.children[i].innerHTML = new_end_txt;
                                if (has_hotreload == true ){
                                  hot_global_build[id].push([e.children[i], global_vars[iiii][0], focus_var]);
                                }
                            } else {
                                if (global_vars[iiii][2] == id) {
                                    new_end_txt += global_vars[iiii][0];
                                    if (has_hotreload == true) {
                                      hot_global_build[id].push([e.children[i], global_vars[iiii][0], focus_var]);
                                    }

                                } else {
                                    e.children[i].innerHTML = "error To use a privide virable from :" + id;
                                    if (has_hotreload == true) {
                                      hot_global_build[id].push([e.children[i], global_vars[iiii][0], focus_var]);
                                    }

                                }
                            }
                        }
                    }

                }
            }
            
        }
          e.children[i].innerHTML = new_end_txt;
      }
    }
  }
    for (i in e.getAttributeNames() ) {
        new_end_txt = '';
        value = e.getAttribute(e.getAttributeNames()[i]).split(' ');
        for (ii in value) {
            focus = value[ii].replace(/ /gi, '');
            if (focus[0] == '@') {
                focus_var = focus.replace("@", "");
                for (iii in arr_Q) {
                    if (e == arr_Q[iii]) {
                        id = iii;
                        for (iiii in global_vars) {
                            if (focus_var == iiii) {
                                if (global_vars[iiii][1] == true) {
                                    new_end_txt += ' ' +global_vars[iiii][0];
                                    if (has_hotreload == true) {
                                      hot_global_build[id].push([e.getAttributeNames()[i], global_vars[iiii][0], focus_var]);
                                    }
                                } else {
                                    if (global_vars[iiii][2] == id) {
                                        new_end_txt += ' ' + global_vars[iiii][0];
                                        if (has_hotreload == true) {
                                          hot_global_build[id].push([e.getAttributeNames()[i], global_vars[iiii][0], focus_var]);
                                        }

                                    } else {
                                       // new_end_txt += " " + "error To use a privide virable from :" + id;
                                        if (has_hotreload == true) {
                                          hot_global_build[id].push([e.getAttributeNames()[i], global_vars[iiii][0], focus_var]);
                                        }
                                    }
                                }
                            }
                        }

                    }
                }
            } else {
                new_end_txt += " " + focus;
            }
        }
        e.setAttribute(e.getAttributeNames()[i], new_end_txt);
    }
}
function htmlTo(e, html) {
  e.innerHTML = html;
}
function throw_alert(arr, qf, has_child_in_child, for_el2, for_el, changing) {
  if (!has_child_in_child) has_child_in_child = false; // for normal
  if (has_child_in_child == false) {
    /*                	console.log('DO')
*/ el = document.createElement("div");
    el2 = document.createElement("div");
    el.appendChild(el2);
    if (for_el) {
      if (for_el.class && typeof for_el.class == "string") {
        el.className = for_el.class;
      }
      if (for_el.style && typeof for_el.style == "object") {
        css(el, for_el.style);
      }
    } else {
      addClass(el, "alert");
    }

    // animate to view
    if (for_el2) {
      if (for_el2.class && typeof for_el2.class == "string") {
        addClass(el2, for_el2.class);
      }
      if (for_el2.style && typeof for_el2.style == "object") {
        css(el2, for_el2.style);
      }
    } else {
      addClass(el2, "alert_Tab");
    }
    document.body.appendChild(el);
  }

  if (typeof arr == "object") {
    for (i in arr) {
      // type => (String) (if you not choose a type or write one at normal will be take a <DAV> )tag_name
      // init =>{
      // onload => (function) function
      // beforeonload => (function) function
      // children => { (String) child_name : (Object<ListHash>) child_object }
      //}
      // text => (String) value
      // html => (String) value
      // id (String) (if not exist , it will get same keyname to be id) => id_value
      // class => (String) class_value or (Array) [(String)any, any, etc]
      // attr => (Object<ListHash>) { (String) attr : (String) attr_value }
      // events: (Object<ListHash>) { (String) name_event: (function) function }
      // children =>  (Object<ListHash>) { (String) child_name : (Object<ListHash>) child_object }
      // key => (String)
      // vars => (Object<ListHash>) {vars, etc}
      // global vars from compiler
        // like selector => to get element json info
        // like e => go get finshing element
        // like n_id_q => id of element from arr_Q !![not support init.beforeonload]
      // chnage to rebiuld a elements jsut write change(key of element, el :  { new changing }) !![should element have a key]
      // setState => to update vars to lastest value just write setState({any-vars : new-value, etc})
      selector = arr[i];
      //init beforeonload 
      // init
      selector.init ? (init = selector.init) : (init = false);
      if (init != false) {
        if (init.beforeonload) init.beforeonload.call();
      }
      // type
      type = "";
      selector.type ? (type = selector.type) : (type = "div");
      if (!changing) {
        e = document.createElement(type);
      } else {
        e = changing;
      }
      // key
      key = "";
      !selector.key ? (key = false) : (key = key = selector.key);
      if (key != false) {
        keys(e, key);
      }

      // text
      selector.text ? textTo(e, selector.text) : "";

      // html
      selector.html ? htmlTo(e, selector.html) : "";

      // id
      id = "";
      !selector.id ? (id = i) : (id = selector.id);
      e.id = id;
      // class name
      className = "";
      if (!selector.class) {
        className = "";
      } else {
        if (typeof selector.class == "string") {
          className = selector.class;
        } else {
          if (typeof selector.class == "object") {
            className = selector.class.toString().replace(/,/gi, " ");
          }
        }
      }
      addClass(e, className);
      // attr
      var attr;
      !selector.attr ? (attr = "none") : (attr = selector.attr);
      if (attr != "none") {
        for (var ii in attr) {
          if (ii == "style") {
            css(e, attr[ii]);
            continue;
          }
          e.setAttribute(ii, attr[ii]);
        }
      }
      //events
      var list_events;
      !selector.events
        ? (list_events = "none")
        : (list_events = selector.events);
      if (list_events != "none") {
        for (event in list_events) {
          e[event] = list_events[event];
        }
      }
      n_id_q = "id" + Math.floor(Math.random() * 500000000000);
      // vars
      vars = {};
      if (selector.vars) {
          for (i in selector.vars) {
              selector.vars[i].push(n_id_q);
              global_vars[i] = selector.vars[i];
          }
      }
      arr_Q[n_id_q] = e;
      if (selector.hot == true) {
          hot_global_build[n_id_q] = []; // for add it for hot reload virable !
          transform_html_vars(e, true); // to if have soem virable in html or attr
      }else {
          transform_html_vars(e, false); // to if have soem virable in html or attr
      }
        
      if (!changing) {
        if (!qf) {
          el2.append(e);
        } else {
          qf.append(e);
        }
      }
      // init
      selector.init ? (init = selector.init) : (init = false);
      if (init != false) {
        if (init.onload) init.onload.call();
        if (init.children) throw_alert(init.children, e, true);
      }
      // children
      if (selector.children) {
        arr_Q_children.push([n_id_q, selector.children]);
      }
      child_translate(n_id_q);
    }
  }
}
function child_translate(expt) {
  for (i in arr_Q_children) {
    if (arr_Q_children[i][0] == expt) {
      qf = arr_Q[expt];
      for (iii in arr_Q_children[i][1]) {
        /*                            console.log(qf)
*/
        if (!arr_Q_children[i][1][iii]) {
          var found = 1;
          for (;;) {
            i = i - found;

            if (!arr_Q_children[i][1][iii]) {
              continue;
            } else {
              qf = arr_Q_children[i][0];
              qf = arr_Q[qf];
              break;
            }
          }
        }
        throw_alert(
          {
            el: arr_Q_children[i][1][iii]
          },
          qf,
          true
        );
        continue;
      }
      break;
    }
  }
}

function change(k, new_chaning) {
  throw_alert(new_chaning, true, true, {}, {}, keys_elements[k]);
}
/*


how use 



throw_alert({
    nameChild  : {
        init : {
            children : {
    
            },
            onload : function () {
                
            }
        }
    }
})







*/
