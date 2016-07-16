import _ from 'lodash';

export function tableDidMount() {
    const win = window;

    if (win.addEventListener) {
        win.addEventListener('resize', _.throttle(this.handleWindowResize, 250), false);
    } else if (win.attachEvent) {
        win.attachEvent('onresize', _.throttle(this.handleWindowResize, 250));
    } else {
        win.onresize = this.handleWindowResize;
    }
}

export function tableWillUnmount() {
    const win = window;

    if (win.removeEventListener) {
        win.removeEventListener('resize', _.throttle(this.handleWindowResize, 250), false);
    } else if (win.removeEvent) {
        win.removeEvent('onresize', _.throttle(this.handleWindowResize, 250), false);
    } else {
        win.onresize = null;
    }
}

export function getTableWidth() {
    try {
        const node = this.refs.TABLE_DIV;
        return node.clientWidth;
    } catch (err) {
        return 1000;
    }
}

export function getTableHeight() {
    try {
        const node = this.refs.TABLE_DIV;
        return node.clientHeight;
    } catch (err) {
        return 600;
    }
}