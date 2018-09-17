            var arr_Q = {};
            var arr_Q_children = [];
            function throw_alert(arr, qf, has_child_in_child, has_new_style_for_el2, has_new_style_for_el) {
                if (!has_child_in_child) has_child_in_child = false;// for normal 
                if (has_child_in_child == false) {
/*                	console.log('DO')
*/                  el = document.createElement('div');
                    el2 = document.createElement('div');
                    el.appendChild(el2);
                    if (has_new_style_for_el) {
                        if (has_new_style_for_el.class && typeof has_new_style_for_el.class == "string") {
                            $(el).addClass(has_new_style_for_el.class);
                        }
                        if (has_new_style_for_el.style && typeof has_new_style_for_el.style == "object") {
                            $(el).css(has_newdd_style_for_el.style);
                        }
                    } else {
                        $(el).addClass('alert')
                    }

                    // animate to view 
                    if (has_new_style_for_el2) {
                        if (has_new_style_for_el2.class && typeof has_new_style_for_el2.class == "string") {
                            $(el2).addClass(has_new_style_for_el2.class );
                        }
                        if (has_new_style_for_el2.style && typeof has_new_style_for_el2.style == "object") {
                            $(el2).css(has_new_style_for_el2.style);
                        }

                    } else {
                        $(el2).addClass('alert_Tab');

                    }
                    document.body.appendChild(el)
                    
                }

                if (typeof (arr) == "object") {
                    for (i in arr) {
                        // type (tag name)
                        // text 
                        // id (if not exist he have it name be id) 
                        // class
                        // attr
                        // events: {name_event: function}
                        // children

                        selector = arr[i];
                        // type
                        type = "";
                        (selector.type) ? type = selector.type : type = 'div'
                        e = document.createElement(type);
                        // text
                        (selector.text) ? text = selector.text : text = ''
                        $(e).html(selector.text);
                        // id
                        id = '';
                        (!selector.id) ? id = i : id = selector.id
                        e.id = id;
                        // class name
                        className = '';
                        (!selector.class) ? className = '' : className = selector.class
                        $(e).addClass(className);

                        // attr
                        var attr;
                        (!selector.attr) ? attr = 'none' : attr = selector.attr
                        if (attr != 'none') {
                            for (ii in attr) {
                                e.setAttribute(ii, attr[ii]);
                            }
                        }
                        //events
                        var list_events;
                        (!selector.events) ? list_events = 'none' : list_events = selector.events
                        if (list_events != 'none') {
                            for (event in list_events) {
                                e[event] = list_events[event];
                            }
                        }
                        n_id_q = 'id' + Math.floor(Math.random() * 500000000000);

                        arr_Q[n_id_q] = e;

                        if (!qf) {
                            $(el2).append(e);
                        } else {
                            $(qf).append(e);

                        }

                        if (selector.children) {

                            arr_Q_children.push([n_id_q, selector.children])

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
                                for (; ; ) {
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
                            throw_alert({
                                el: arr_Q_children[i][1][iii]
                            }, qf, true)
                            continue;
                        }
                        break;

                    }
                }
            }
