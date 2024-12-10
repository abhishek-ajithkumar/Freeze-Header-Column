/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/record', 'N/search', 'N/ui/serverWidget'],
    /**
 * @param{record} record
 * @param{search} search
 * @param{serverWidget} serverWidget
 */
    (record, search, serverWidget) => {
        /**
         * Defines the function definition that is executed before record is loaded.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @param {Form} scriptContext.form - Current form
         * @param {ServletRequest} scriptContext.request - HTTP request information sent from the browser for a client action only.
         * @since 2015.2
         */
        const beforeLoad = (scriptContext) => {
            try {
                // Set the client script file using the file path
                scriptContext.form.clientScriptModulePath = './jj_cs_freeze_header.js'; // Replace with your actual file path

                let htmlString = 
                '<script>' +
                '   function freezeHeadAndColumn() {' +
                '       (function ($, undefined) {' +
                '           $(function () {' +
                '               const windowHeight = $(window).height();' +
                '               const container = $(\'.uir-machine-table-container\');' +

                                // Set container height for scrollable area
                '               if (container.height() < windowHeight) {' +
                '                   container.css(\'height\', \'auto\');' +
                '               } else {' +
                '                   container.css(\'height\', \'70vh\');' +
                '               }' +

                '               container.bind(\'scroll\', (event) => {' +
                '                   const headerElem = $(event.target).find(\'.uir-machine-headerrow, .uir-list-headerrow\');' +

                                    // Freeze header row
                '                   headerElem.css(\'transform\', `translate(0, ${event.target.scrollTop}px)`);' +
                '                   const rows = $(event.target).find(\'table tr\');' +
                '                   rows.each((index, row) => {' +
                '                       const firstCell = $(row).find(\'th:first-child, td:first-child\');' +

                                        // Freeze first column
                '                       firstCell.css(\'transform\', `translate(${event.target.scrollLeft}px, 0)`);' +
                '                   });' +
                '               });' +
                '           });' +
                '       })(window.jQuery);' +
                '   }' +
                '   freezeHeadAndColumn();' +
                '</script>';

                // let htmlString =
                //     '<script>' +
                //     '   function freezeHeadAndColumn() {' +
                //     '       (function ($, undefined) {' +
                //     '           $(function () {' +
                //     '               const windowHeight = $(window).height();' +
                //     '               const container = $(\'.uir-machine-table-container\');' +

                //                     // Set container height for scrollable area
                //     '               if (container.height() < windowHeight) {' +
                //     '                   container.css(\'height\', \'auto\');' +
                //     '               } else {' +
                //     '                   container.css(\'height\', \'70vh\');' +
                //     '               }' +

                //                     // Apply freeze logic regardless of scroll
                //     '               const headerElem = container.find(\'.uir-machine-headerrow, .uir-list-headerrow\');' +
                //     '               headerElem.css(\'transform\', `translate(0, 0)`);' +
                //     '               const rows = container.find(\'table tr\');' +
                //     '               rows.each((index, row) => {' +
                //     '                   const firstCell = $(row).find(\'th:first-child, td:first-child\');' +
                //     '                   firstCell.css(\'transform\', `translate(0, 0)`);' +
                //     '               });' +

                //                     // Bind scroll event for larger containers
                //     '               container.bind(\'scroll\', (event) => {' +
                //     '                   const headerElem = $(event.target).find(\'.uir-machine-headerrow, .uir-list-headerrow\');' +
                //     '                   headerElem.css(\'transform\', `translate(0, ${event.target.scrollTop}px)`);' +
                //     '                   const rows = $(event.target).find(\'table tr\');' +
                //     '                   rows.each((index, row) => {' +
                //     '                       const firstCell = $(row).find(\'th:first-child, td:first-child\');' +
                //     '                       firstCell.css(\'transform\', `translate(${event.target.scrollLeft}px, 0)`);' +
                //     '                   });' +
                //     '               });' +
                //     '           });' +
                //     '       })(window.jQuery);' +
                //     '   }' +
                //     '   freezeHeadAndColumn();' +
                //     '</script>';


                scriptContext.form.addField({
                    type: 'inlinehtml',
                    id: 'custpage_stickyheaders_script',
                    label: 'Hidden'
                }).defaultValue = htmlString;
            } catch (err) {
                log.debug("error@beforeLoad", err);
            }
        }

        return { beforeLoad }

    });
