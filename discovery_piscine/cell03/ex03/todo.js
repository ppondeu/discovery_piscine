showTodo();
function enterText() {
    var todoText = prompt("Enter Text");
    // check if prompt is not null
    if (todoText != null) {
        setCookie(todoText);
        showTodo();
    }

}

function setCookie(value) {
    curDate = new Date();
    curDate.setMinutes(curDate.getMinutes() + 30);

    encodedValue = encodeURIComponent(value);
    prevCookie = document.cookie;
    if (prevCookie == "") {
        document.cookie = "ft_list=" + encodedValue + ";" + "expires=" + curDate.toUTCString() + ";";
        return;
    }
    prevCookie += ("," + encodedValue);

    document.cookie = prevCookie + ";" + "expires=" + curDate.toUTCString() + ";";
}

function getCookie(md) {
    var cookies = document.cookie;
    if (cookies == "") {
        return new Array();
    }
    var cookieArray = cookies.split("=")[1].split(",");
    if (md == 0) {
        return cookieArray;
    }
    var todoArray = new Array();

    for (var i = 0; i < cookieArray.length; i++) {
        var value = decodeURIComponent(cookieArray[i]);
        todoArray.push(value);
    }
    return todoArray;
}

function showTodo() {
    var todoArray = getCookie(1);

    var todoList = document.getElementById("ft_list");
    todoList.innerHTML = "";

    for (let i = 0; i < todoArray.length; i++) {
        var div = document.createElement("div");
        div.setAttribute("id", "todo_" + i);
        div.setAttribute("onclick", "deleteCookie(this.id)");
        div.style.whiteSpace = "pre";
        div.innerHTML = todoArray[i];
        todoList.prepend(div);
    }
}

function deleteCookie(id) {
    if (confirm("would you like to delete?")) {
        var todoList = document.getElementById("ft_list");
        var todo = document.getElementById(id);
        todoList.removeChild(todo);
        var target = id.substring(5, id.length);
        var todoArray = getCookie(0);
        todoArray.splice(target, 1);
        var curDate = new Date();
        curDate.setMinutes(curDate.getMinutes() + 30);

        if (todoArray.length == 0) {
            // delete cookie
            document.cookie = "ft_list=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
        else {
            document.cookie = "ft_list=" + todoArray.join(",") + ";expires=" + curDate.toUTCString() + ";";
        }
        showTodo();
    }
}