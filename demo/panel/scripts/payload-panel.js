class PayloadPanel {
    constructor() {
        const ws = new WebSocket('ws://localhost:8080');

        ws.addEventListener('message', (event) => {
            const item = JSON.parse(event.data);
            this.messages.push(item);
            this.displayMessage(this.messages.length - 1);
            this.updateSummary();
        });

        const $summary = $('.summary');
        this.$errorNumber = $summary.find('.number-errors');
        this.$successNumber = $summary.find('.number-successes');

        this.$clearResults = $('.action-clear-results');
        this.$filterError = $('.action-filter-error');
        this.$filterSuccess = $('.action-filter-success');
        this.$removeFilter = $('.action-remove-filter');

        this.$table = $('.table > tbody');
        this.messages = [];

        this.setupEvents();
    }

    clearSummary() {
        this.$errorNumber.text('0');
        this.$successNumber.text('0');
    }

    clearResults() {
        this.$table.empty();
    }

    updateSummary() {
        const errorList = this.messages.filter((item) => {
            return item.type === 'error';
        });
        const successList = this.messages.filter((item) => {
            return item.type === 'ok';
        });

        this.$errorNumber.text(String(errorList.length));
        this.$successNumber.text(String(successList.length));
    }

    displayMessage(index) {
        const item = this.messages[index];
        const $id = $('<td>').text(String(index + 1));
        const $status = $('<td>').text(item.type);
        const $testCase = $('<td>').text(item.name);
        const $message = $('<td>').text(item.msg);

        const $row = $('<tr>')
            .append($id)
            .append($status)
            .append($testCase)
            .append($message)
            .addClass(PayloadPanel.translateStatus(item.type));

        this.$table.append($row);
    }

    displayMessages(type) {
        this.messages.forEach((item, index) => {
            if (typeof type === 'string' && item.type !== type) {
                return;
            }
            this.displayMessage(index);
        });
    }

    setupEvents() {
        this.$clearResults.on({
            click: () => {
                this.messages = [];
                this.clearSummary();
                this.clearResults();
            }
        });
        this.$filterError.on({
            click: () => {
                this.clearResults();
                this.displayMessages('error');
            }
        });
        this.$filterSuccess.on({
            click: () => {
                this.clearResults();
                this.displayMessages('ok');
            }
        });
        this.$removeFilter.on({
            click: () => {
                this.clearResults();
                this.displayMessages();
                this.updateSummary();
            }
        });
    }

    static translateStatus(status) {
        const statusList = {
            ok: 'success',
            error: 'danger',
            warn: 'warning'
        };

        return statusList[status];
    }
}
