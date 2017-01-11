const shell = require('electron').shell

export default {
    linksinit() {
        document.addEventListener("click", function(e) {
                var link = e.target,
                    url = link.getAttribute('href');
                if (link.tagName == "A" && url.indexOf('http') === 0) {
                    e.preventDefault();
                    shell.openExternal(url);
                }

            })
            /*
            const links = document.querySelectorAll('a[href]');

            [].forEach.call(links, function(link) {
                const url = link.getAttribute('href')
                if (url.indexOf('http') === 0) {
                    link.addEventListener('click', function(e) {
                        e.preventDefault()
                        shell.openExternal(url)
                    })
                }
            })*/
    }
}