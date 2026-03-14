document.addEventListener('DOMContentLoaded', () => {
    const facultySelect = document.getElementById('faculty-select');
    const statusCard = document.getElementById('status-card');
    const avatarInitials = document.getElementById('avatar-initials');
    const facultyName = document.getElementById('faculty-name');
    const statusBadge = document.getElementById('status-badge');
    const statusText = document.getElementById('status-text');
    const roomInfo = document.getElementById('room-info');

    // Mock data for availability
    // In a real application, this would be fetched from an API
    const facultyData = {
        principal: {
            name: "Principal Sir",
            initials: "PR",
            status: "Available", // Can toggle to "Busy"
            room: "Main Office - Ground Floor",
            isAvailable: true
        },
        om: {
            name: "OM Sir",
            initials: "OM",
            status: "Busy (In a Meeting)", // Can toggle to "Available"
            room: "Admin Block - Room 102",
            isAvailable: false
        }
    };

    // Randomize slightly for demo purposes so it's not always the same
    // (Optional: Remove if you want strict hardcoded values above)
    // Here we'll just stick to the hardcoded logic but realistically it might change.
    
    facultySelect.addEventListener('change', (e) => {
        const selectedId = e.target.value;
        
        if (selectedId && facultyData[selectedId]) {
            const data = facultyData[selectedId];
            
            // Generate a slight random chance to make it dynamic for demo purposes
            // Let's create a dynamic mock where they might be unavailable randomly
            const randomCheck = Math.random() > 0.5;
            const currentAvailable = selectedId === 'principal' ? randomCheck : !randomCheck;
            
            data.isAvailable = currentAvailable;
            data.status = currentAvailable ? "Available" : "Busy";
            
            updateUI(data);
        }
    });

    function updateUI(data) {
        // Reset animation
        statusCard.classList.remove('visible');
        
        // Wait a tiny bit for the removal to register, then update and show
        setTimeout(() => {
            // Update Text
            facultyName.textContent = data.name;
            avatarInitials.textContent = data.initials;
            statusText.textContent = data.status;
            roomInfo.textContent = data.room;
            
            // Update Classes for styling
            statusBadge.className = 'status-badge'; // Reset classes
            
            if (data.isAvailable) {
                statusBadge.classList.add('status-available');
            } else {
                statusBadge.classList.add('status-busy');
            }
            
            // Show Card
            statusCard.classList.remove('hidden');
            
            // Trigger reflow to restart animation
            void statusCard.offsetWidth; 
            
            statusCard.classList.add('visible');
        }, 150);
    }
});
