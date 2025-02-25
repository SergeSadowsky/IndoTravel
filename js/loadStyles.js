const styles = new Map();

const loadStyle = (url) => {
    if(styles.has(url)){
        return styles.get(url);
    }
    const promise = new Promise((resolve) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        document.head.append(link);
        link.addEventListener('load', () => {
            resolve();
        });
    })

    styles.set(url, promise);
    return promise;
};

export default loadStyle;