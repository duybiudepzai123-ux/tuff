document.addEventListener('DOMContentLoaded', () => {
    const gameListDiv = document.getElementById('game-list');
    const resultDiv = document.getElementById('result');

    // **Bước 1: Tải dữ liệu Game trực tiếp từ file games.json**
    // Sử dụng đường dẫn tương đối (./games.json)
    fetch('./backend/games.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Không thể tải games.json. Vui lòng kiểm tra file và đường dẫn.');
            }
            return response.json();
        })
        .then(games => {
            if (games.length === 0) {
                gameListDiv.innerHTML = '<p>Không có trò chơi nào trong danh sách.</p>';
                return;
            }

            // **Bước 2: Hiển thị danh sách game**
            games.forEach(game => {
                const gameElement = document.createElement('div');
                gameElement.className = 'game-item';
                
                const title = document.createElement('h3');
                title.textContent = game.name;
                
                const button = document.createElement('button');
                button.textContent = `Tải ngay`;
                
                // Gắn sự kiện click
                button.onclick = () => {
                    initiateDownload(game.pkg_url, game.name);
                };
                
                gameElement.appendChild(title);
                gameElement.appendChild(button);
                gameListDiv.appendChild(gameElement);
            });
        })
        .catch(error => {
            console.error('Lỗi: ', error);
            resultDiv.innerHTML = `<p style="color: red;">⚠️ Đã xảy ra lỗi khi tải dữ liệu: ${error.message}</p>`;
        });
});

/**
 * Hàm kích hoạt quá trình tải xuống. 
 * Kỹ thuật này dựa vào việc trình duyệt PS4 (sau khi chạy HEN/GoldHEN) 
 * sẽ tự động giao liên kết .pkg cho Remote Package Installer xử lý.
 * @param {string} pkgUrl - URL PKG trực tiếp.
 * @param {string} gameName - Tên game.
 */
function initiateDownload(pkgUrl, gameName) {
    const resultDiv = document.getElementById('result');
    
    // 1. Hiển thị thông báo
    resultDiv.innerHTML = `Đang kích hoạt tải xuống cho **${gameName}**... <br> Vui lòng theo dõi thông báo trên màn hình PS4.`;
    
    // 2. Kích hoạt RPI bằng cách Chuyển hướng
    // Đây là bước quan trọng nhất: Chuyển hướng đến URL .pkg trực tiếp.
    window.location.href = pkgUrl;
    
    // Chức năng này yêu cầu người dùng đã chạy HEN/GoldHEN trước khi truy cập trang web.
}
