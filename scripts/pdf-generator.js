async function generatePdf() {
    const pdf = new jspdf.jsPDF({
        unit: 'mm', // Используем миллиметры
        format: 'a4' // Размер страницы
    });

    pdf.addFont(`data:font/ttf;base64,${window.base64Font}`, 'CustomFont', 'normal');
    pdf.setFont('CustomFont');

    const ingredients = [];
    const listItems = elems.ingredientListElement.querySelectorAll('li');
    listItems.forEach(item => ingredients.push(item.textContent));


    let y = 15;
    const lineHeight = 6;
    pdf.setFontSize(14);

    const pageSize = pdf.internal.pageSize;
    const pageWidth = pageSize.getWidth();


    let pageCount = 0;
    ingredients.forEach((ingredient) => {
        if (pdf.getTextWidth(ingredient) > pageWidth * 0.9) {
            pdf.addPage();
            pageCount++;
            y = 15;
        }
        if (pdf.getTextWidth(ingredient) > pageWidth * 0.9 || y + lineHeight > pageSize.getHeight()) {
            pdf.addPage();
            pageCount++;
            y = 15;
        }
        if (pdf.getTextWidth(ingredient) > pageWidth * 0.8) { // Условие для разбивки на строки
            const words = ingredient.split(' ');
            let currentLine = '';
            for (let i = 0; i < words.length; i++) {
                const word = words[i];
                const combinedWidth = pdf.getTextWidth(currentLine + word + ' ');
                if (combinedWidth > pageWidth * 0.8) { // Условие для разбивки на строки
                        pdf.text(currentLine, 10, y);
                        currentLine = word + ' ';
                        y += lineHeight;
                } else {
                    currentLine += word + ' ';
                }
            }
            pdf.text(currentLine, 10, y);
            y += lineHeight;
        } else {
            pdf.text(ingredient, 10, y);
            y += lineHeight;
        }
    });

    // is mobile
    if (!/iphone|ipad|ipod|android|blackberry|windows phone/.test(navigator.userAgent.toLowerCase())) {
        pdf.save('ingredients.pdf'); 
        return;
    }

    const pdfBlob = await pdf.output('blob', { filename: 'ingredients.pdf' });

    const shareButton = document.createElement('button');
    shareButton.textContent = 'Поделиться PDF';
    shareButton.style.display = 'none';
    document.body.appendChild(shareButton);

    shareButton.addEventListener('click', async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Список ингредиентов',
                        files: [
                        new File([pdfBlob], 'ingredients.pdf', {
                        type: 'application/pdf'
                        })
                    ]
                })
            }
            catch (e) {
                pdf.save('ingredients.pdf'); 
            }
            
        } else {
            pdf.save('ingredients.pdf'); 
        }
        shareButton.remove()
        document.body.removeChild(shareButton);
    });

    shareButton.click();
}