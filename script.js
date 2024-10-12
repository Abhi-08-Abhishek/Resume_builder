$(document).ready(function () {
    // Update preview when inputs change
    $('#resume-form input, #resume-form textarea').on('input', updatePreview);
    $('#add-education').click(addEducationEntry);
    $('#add-experience').click(addExperienceEntry);
    $('#clear-form').click(clearForm);
    $('#download-resume').click(downloadPDF);
    
    // Remove entry button functionality
    $(document).on('click', '.remove-btn', function () {
        $(this).closest('.education-entry, .experience-entry').remove();
        updatePreview(); // Update preview after removing entry
    });

    function updatePreview() {
        const name = $('#name').val() || 'Your Name';
        const email = $('#email').val() || 'your.email@example.com';
        const phone = $('#phone').val() || 'Your Phone';
        const summary = $('#summary').val() || 'Profile Summary';
        
        // Get education entries
        const education = $('.education-entry').map(function () {
            return `${$(this).find('input').eq(0).val()} - ${$(this).find('input').eq(1).val()}`;
        }).get().join('<br>') || 'No Education Listed';

        // Get skills
        const skills = $('#skills-section input:checked').map(function () {
            return $(this).val();
        }).get().join(', ') || 'No Skills Selected';

        // Get experience entries
        const experience = $('.experience-entry').map(function () {
            return `${$(this).find('input').eq(0).val()} at ${$(this).find('input').eq(1).val()}`;
        }).get().join('<br>') || 'No Experience Listed';

        // Construct the preview HTML
        const previewContent = `
            <h3>${name}</h3>
            <p>Email: ${email}</p>
            <p>Phone: ${phone}</p>
            <h4>Profile Summary</h4>
            <p>${summary}</p>
            <h4>Education</h4>
            <p>${education}</p>
            <h4>Skills</h4>
            <p>${skills}</p>
            <h4>Experience</h4>
            <p>${experience}</p>
        `;

        $('#preview-content').html(previewContent);
    }

    function addEducationEntry() {
        $('#education-section').append(`
            <div class="education-entry">
                <input type="text" placeholder="Degree" required>
                <input type="text" placeholder="Institution" required>
                <button type="button" class="remove-btn">Remove</button>
            </div>
        `);
    }

    function addExperienceEntry() {
        $('#experience-section').append(`
            <div class="experience-entry">
                <input type="text" placeholder="Job Title" required>
                <input type="text" placeholder="Company" required>
                <button type="button" class="remove-btn">Remove</button>
            </div>
        `);
    }

    function clearForm() {
        $('#resume-form')[0].reset(); // Reset form fields
        $('#preview-content').html(''); // Clear preview
        $('.education-entry, .experience-entry').remove(); // Clear added entries
    }

    function downloadPDF() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        const name = $('#name').val() || 'Your Name';
        const email = $('#email').val() || 'your.email@example.com';
        const phone = $('#phone').val() || 'Your Phone';
        const summary = $('#summary').val() || 'Profile Summary';

        const education = $('.education-entry').map(function () {
            return `${$(this).find('input').eq(0).val()} - ${$(this).find('input').eq(1).val()}`;
        }).get();

        const skills = $('#skills-section input:checked').map(function () {
            return $(this).val();
        }).get().join(', ');

        const experience = $('.experience-entry').map(function () {
            return `${$(this).find('input').eq(0).val()} at ${$(this).find('input').eq(1).val()}`;
        }).get();

        // Create the PDF content
        let content = `
            ${name}
            Email: ${email}
            Phone: ${phone}
            
            Profile Summary
            ${summary}
            
            Education
            ${education.join('\n') || 'No Education Listed'}
            
            Skills
            ${skills || 'No Skills Selected'}
            
            Experience
            ${experience.join('\n') || 'No Experience Listed'}
        `;

        // Add content to PDF
        doc.text(content, 10, 10);
        doc.save('resume.pdf');
    }
});
