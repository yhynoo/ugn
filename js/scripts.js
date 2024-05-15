import data from "../data/ugnExtended.json" with {type: 'json'}

export function processQuery(query) {
    const allSigns = data
    let matchedSign = null

    allSigns.forEach(sign => {
        if (sign.sign === query.toUpperCase() || sign.alternativeSigns.split(" ").includes(query.toUpperCase())) {
            matchedSign = sign
        }
    })
    return matchedSign
}

export function drawProcessedQuery(matchedSign) {

    // break if null
    if (matchedSign === null) {
        return `no results.`
    }

    // otherwise work
    const { sign, _alternativeSigns, extendedInterpretations } = matchedSign
    let html = `<div class = 'ugnResults'><strong>results for <span class = 'ugnHighlight'>${sign}</span>:</strong>`

    extendedInterpretations.forEach(interpretation => {
        html += `<div class = 'ugnAllogram'>
            <p>
                <strong>${interpretation.value}</strong><br>
                ${interpretation.relation.join(', ')} (${interpretation.reference})
            </p>`

        if (interpretation.comment) { html += `<p><strong>comments:<br></strong>${interpretation.comment}</p>`}
        html += '</div>'
    })
    html += '</div>'

    return html
}