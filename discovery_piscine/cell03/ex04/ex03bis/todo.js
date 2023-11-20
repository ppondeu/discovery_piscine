$(document).ready(function () {
    showTodo();
    $("#btn").click(function () {
        var todoText = prompt("Enter Text");
        // check if prompt is not null
        if (todoText != "" && todoText != null) {
            setCookie(todoText);
            showTodo();
        }
    });
});

function setCookie(value) {
    const curDate = new Date();
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
    var todoArray = cookieArray.map(function (value) {
        return decodeURIComponent(value);
    });
    return todoArray;
}

function showTodo() {
    var todoArray = getCookie(1);

    const todoList = $("#ft_list");
    todoList.html("");
    todoArray.forEach(function (todoText) {
        const todoDiv = $("<div>").addClass("todo-item").attr("data-id", todoArray.indexOf(todoText)).text(todoText).css("whiteSpace", "pre");
        
        todoDiv.click(function () {
            if (confirm("would you like to delete?")) {
                todoList.remove(todoDiv);
                encodedArray = getCookie(0);
                encodedArray.splice(todoArray.indexOf(todoText), 1);
                const curDate = new Date();
                curDate.setMinutes(curDate.getMinutes() + 30);
                // check if array is empty
                if (encodedArray.length == 0) {
                    // delete cookie
                    document.cookie = "ft_list=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
                }
                else {
                    document.cookie = "ft_list=" + encodedArray.join(",") + ";expires=" + curDate.toUTCString() + ";";
                }
                showTodo();
            }
        }
        );

        todoList.prepend(todoDiv);
    });
}