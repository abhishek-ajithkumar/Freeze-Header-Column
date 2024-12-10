/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/record'],
/**
 * @param{record} record
 */
function(record) {
    
    
    function activateFreeze(context) {
        freezeHeadAndColumn();
    }

    return {
        pageInit: activateFreeze,
        lineInit: activateFreeze
    };
    
});
