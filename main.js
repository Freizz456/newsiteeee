 let pageHeight = 50;

// Создаем элемент-триггер в конце страницы
const trigger = document.createElement('div');
trigger.style.height = '1px';
trigger.style.visibility = 'hidden';
document.body.appendChild(trigger);

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            pageHeight += 50;
            document.body.style.minHeight = pageHeight + 'vh';
            console.log('Высота страницы увеличена до: ' + pageHeight + 'vh');
        }
    });
}, {
    threshold: 0.1 // Срабатывает когда 10% триггера видно
});

observer.observe(trigger);


              document.addEventListener('DOMContentLoaded', function() {
            const sliderContainer = document.getElementById('sliderContainer');
            const indicators = document.querySelectorAll('.slider__indicator');
            const cards = document.querySelectorAll('.slider__card');
            
            let currentSlide = 0;
            const totalSlides = 3; // 3 позиции: 1-4, 2-5, 3-6
            let cardWidth = cards[0].offsetWidth + 20; // ширина карточки + gap
            
            // Функция обновления слайдера
            function updateSlider() {
                // Сдвигаем контейнер на нужное количество карточек
                const translateX = currentSlide * cardWidth;
                sliderContainer.style.transform = 'translateX(-' + translateX + 'px)';
                
                // Обновляем индикаторы
                indicators.forEach((indicator, index) => {
                    if (index === currentSlide) {
                        indicator.classList.add('slider__indicator--active');
                    } else {
                        indicator.classList.remove('slider__indicator--active');
                    }
                });
                
                // Логируем текущие видимые карточки
                console.log('Позиция ' + (currentSlide + 1) + ': Видны карточки ' + (currentSlide + 1) + '-' + (currentSlide + 4));
            }
            
            // Обработчики для индикаторов
            indicators.forEach(indicator => {
                indicator.addEventListener('click', function() {
                    currentSlide = parseInt(this.getAttribute('data-slide'));
                    updateSlider();
                });
            });
    
            // Обработчик ресайза окна
            window.addEventListener('resize', function() {
                // Пересчитываем ширину карточки при изменении размера окна
                const newCardWidth = cards[0].offsetWidth + 20;
                if (cardWidth !== newCardWidth) {
                    cardWidth = newCardWidth;
                    updateSlider();
                }
            });
        });
        


          document.addEventListener('DOMContentLoaded', function() {
            const buttons = document.querySelectorAll('.video-button');
            const videoFrame = document.getElementById('videoFrame');
            const videoContainer = document.querySelector('.video-player');
            const videoLoading = document.getElementById('videoLoading');
            
            // Центральная кнопка паузы/воспроизведения
            const centerPlayPauseBtn = document.getElementById('centerPlayPauseBtn');
            const centerPlayIcon = document.getElementById('centerPlayIcon');
            const centerPauseIcon = document.getElementById('centerPauseIcon');

            // Массив с YouTube видео (используем короткие ключи)
            const videos = {
                rainbow: 'https://www.youtube.com/embed/HqpjPnctPtY',
                rust: 'https://www.youtube.com/embed/EF3nSsdMihs',
                pubg: 'https://www.youtube.com/embed/kwJ_n7C9fko',
                apex: 'https://www.youtube.com/embed/HqpjPnctPtY',
                csgo: 'https://www.youtube.com/embed/-UNCF6lNNb8'
            };

            // Функция для создания YouTube iframe
            function createYouTubeIframe(videoId) {
                const iframe = document.createElement('iframe');
                iframe.src = videoId + '?autoplay=1&rel=0&modestbranding=1';
                iframe.width = '100%';
                iframe.height = '400';
                iframe.frameBorder = '0';
                iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
                iframe.allowFullscreen = true;
                iframe.title = 'YouTube video player';
                
                return iframe;
            }            // Функция для загрузки видео
            function loadVideo(videoType) {
                // Показываем индикатор загрузки
                videoLoading.classList.add('video-loading--visible');
                
                // Добавляем анимацию исчезновения
                videoContainer.classList.remove('video-player--fade-in');
                
                // Меняем видео после небольшой задержки для плавности
                setTimeout(() => {
                    // Очищаем контейнер
                    videoFrame.innerHTML = '';
                    
                    // Создаем и добавляем новый iframe
                    const iframe = createYouTubeIframe(videos[videoType]);
                    videoFrame.appendChild(iframe);
                    
                    // Скрываем индикатор загрузки после загрузки видео
                    iframe.addEventListener('load', () => {
                        setTimeout(() => {
                            videoLoading.classList.remove('video-loading--visible');
                            videoContainer.classList.add('video-player--fade-in');
                        }, 500);
                    });
                    
                    // На всякий случай скрываем индикатор через 3 секунды
                    setTimeout(() => {
                        videoLoading.classList.remove('video-loading--visible');
                        videoContainer.classList.add('video-player--fade-in');
                    }, 3000);
                    
                }, 300);
            }

            // Обработчики для кнопок выбора видео
            buttons.forEach(button => {
                button.addEventListener('click', function() {
                    // Убираем активный класс со всех кнопок
                    buttons.forEach(btn => btn.classList.remove('video-button--active'));
                    
                    // Добавляем активный класс нажатой кнопке
                    this.classList.add('video-button--active');
                    
                    // Получаем тип видео из data-атрибута
                    const videoType = this.getAttribute('data-video');
                    
                    // Загружаем видео
                    loadVideo(videoType);
                });
            });

            // Обновление иконки центральной кнопки паузы/воспроизведения
            function updateCenterPlayPauseButton(isPlaying) {
                if (isPlaying) {
                    centerPlayIcon.style.display = 'none';
                    centerPauseIcon.style.display = 'block';
                } else {
                    centerPlayIcon.style.display = 'block';
                    centerPauseIcon.style.display = 'none';
                }
            }

            // Обработчик для центральной кнопки паузы/воспроизведения
            centerPlayPauseBtn.addEventListener('click', function() {
                // Для YouTube видео управление осуществляется через iframe API
                // В данном случае просто скрываем/показываем кнопку
                console.log('Управление YouTube видео требует iframe API');
            });

            // Инициализация состояния кнопки
            updateCenterPlayPauseButton(false);

            // Автоматически загружаем первое видео
            setTimeout(() => {
                const firstButton = document.querySelector('.video-button--active');
                if (firstButton) {
                    loadVideo(firstButton.getAttribute('data-video'));
                }
            }, 500);
        });







                // Функция для форматирования даты
        function formatDate(dateString) {
            try {
                const date = new Date(dateString);
                if (isNaN(date.getTime())) {
                    return 'Дата не указана';
                }
                return date.toLocaleDateString('ru-RU', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'                });
            } catch (error) {
                console.error('Ошибка форматирования даты:', error);
                return 'Дата не указана';
            }
        }

        // Функция для создания карточки отзыва (безопасная версия)
        function createReviewCard(review) {
            const reviewCard = document.createElement('div');
            reviewCard.className = 'review-card';
            
            // Создаем элементы безопасно
            const header = document.createElement('div');
            header.className = 'review-card__header';
            
            const email = document.createElement('div');
            email.className = 'review-card__email';
            email.textContent = review.email || 'Анонимный пользователь';
            
            const date = document.createElement('div');
            date.className = 'review-card__date';
            date.textContent = formatDate(review.date);
            
            const divider = document.createElement('div');
            divider.className = 'review-card__divider';
            
            const text = document.createElement('div');
            text.className = 'review-card__text';
            text.textContent = review.text || 'Текст отзыва отсутствует';
            
            // Собираем структуру
            header.appendChild(email);
            header.appendChild(date);
            
            reviewCard.appendChild(header);
            reviewCard.appendChild(divider);
            reviewCard.appendChild(text);
            
            return reviewCard;
        }

        // Класс для управления отзывами
        class ReviewsManager {
            constructor() {
                this.allReviews = [];
                this.displayedReviews = 0;
                this.reviewsPerLoad = 5;
                this.reviewsContainer = document.getElementById('reviews-container');
                this.loadMoreBtn = document.getElementById('load-more-btn');
                
                this.init();
            }
            
            init() {
                // Загружаем все отзывы
                this.loadAllReviews();
                
                // Показываем первые 5 отзывов
                this.showMoreReviews();
                
                // Назначаем обработчик для кнопки
                this.loadMoreBtn.addEventListener('click', () => {
                    this.showMoreReviews();
                });
            }
            
            loadAllReviews() {
                // Пример данных отзывов (в реальном приложении здесь был бы запрос к API)
                this.allReviews = [
                    {
                        email: "exzrus39region@gmail.com",
                        date: "2024-01-15",
                        text: "Отличный сервис! Быстро и качественно выполнили заказ. Обязательно буду рекомендовать друзьям и обращаться снова."
                    },
                    {
                        email: "akkdlaprima@gmail.com",
                        date: "2024-01-10",
                        text: "Очень доволен работой, рекомендую! Специалисты проявили профессионализм и внимательность к деталям."
                    },
                    {
                        email: "lol.tigr.ru@mail.ru",
                        date: "2024-01-05",
                        text: "Спасибо за оперативность и качество! Все сделали в срок, даже раньше обещанного. Отличная коммуникация на всех этапах работы."
                    },
                    {
                        email: "spikev228@gmail.com",
                        date: "2023-12-28",
                        text: "Работаем с этой компанией уже более года. Всегда получаем качественный сервис и профессиональный подход. Особенно хочется отметить отзывчивость технической поддержки."
                    },
                    {
                        email: "also86@internet.ru",
                        date: "2023-12-20",                        
                        text: "Приятно удивлен уровнем сервиса. Все вопросы решались быстро, без лишних проволочек. Цены вполне адекватные за такое качество."
                    },
                    {
                        email: "maria.ivanova@yandex.ru",
                        date: "2023-12-15",
                        text: "Отличное соотношение цены и качества. Выполнили все точно по требованиям, без нареканий. Буду обращаться еще!"
                    },
                    {
                        email: "sergey.smirnov@hotmail.com",
                        date: "2023-12-10",
                        text: "Быстрая реакция на запросы, качественное исполнение. Отдельное спасибо за терпение и помощь в доработках."
                    },
                    {
                        email: "ekaterina.kuznetsova@outlook.com",
                        date: "2023-12-05",
                        text: "Профессиональный подход к работе. Все сделано аккуратно и в срок. Рекомендую как надежного партнера."
                    },
                    {
                        email: "dmitry.volkov@gmail.com",
                        date: "2023-11-28",
                        text: "Отличный сервис, вежливые сотрудники. Все объяснили, помогли разобраться. Очень доволен сотрудничеством."
                    },
                    {
                        email: "olga.nikolaeva@yandex.ru",
                        date: "2023-11-20",
                        text: "Качественная работа, ответственный подход. Все пожелания были учтены. Обязательно буду сотрудничать снова."
                    },
                    {
                        email: "vladimir.popov@mail.ru",
                        date: "2023-11-15",
                        text: "Быстро, качественно, профессионально. Все поставленные задачи выполнены в полном объеме. Рекомендую!"
                    },
                    {
                        email: "natalia.fedorova@gmail.com",
                        date: "2023-11-10",
                        text: "Приятно работать с профессионалами. Все четко, по делу, без лишних слов. Отличный результат!"
                    }
                ];
            }
            
            showMoreReviews() {
                const nextReviews = this.allReviews.slice(
                    this.displayedReviews, 
                    this.displayedReviews + this.reviewsPerLoad
                );
                
                if (nextReviews.length === 0) {
                    this.showNoMoreReviews();
                    return;
                }
                
                nextReviews.forEach(review => {
                    try {
                        const reviewCard = createReviewCard(review);
                        this.reviewsContainer.appendChild(reviewCard);
                    } catch (error) {
                        console.error('Ошибка создания карточки отзыва:', error);
                    }
                });
                
                this.displayedReviews += nextReviews.length;
                
                // Проверяем, остались ли еще отзывы для показа
                if (this.displayedReviews >= this.allReviews.length) {
                    this.showNoMoreReviews();
                }
            }
            
            showNoMoreReviews() {
                this.loadMoreBtn.disabled = true;
                this.loadMoreBtn.textContent = 'Все отзывы загружены';
                
                // Добавляем сообщение, если нет отзывов вообще
                if (this.allReviews.length === 0) {
                    const noReviews = document.createElement('div');
                    noReviews.className = 'no-reviews';
                    noReviews.textContent = 'Отзывов пока нет';
                    this.reviewsContainer.appendChild(noReviews);
                }
            }
        }

        // Инициализация менеджера отзывов при загрузке страницы
        document.addEventListener('DOMContentLoaded', function() {
            try {
                new ReviewsManager();            } catch (error) {
                console.error('Ошибка при загрузке отзывов:', error);
                const container = document.getElementById('reviews-container');
                container.innerHTML = '<div class="no-reviews">Произошла ошибка при загрузке отзывов</div>';
                
                const loadMoreBtn = document.getElementById('load-more-btn');
                loadMoreBtn.style.display = 'none';
            }
        });







        document.addEventListener('DOMContentLoaded', function() {
            const screenshotCards = document.querySelectorAll('.screenshots__card');
            const modal = document.getElementById('imageModal');
            const modalImg = document.getElementById('modalImg');
            const modalClose = document.getElementById('modalClose');            const modalPrev = document.getElementById('modalPrev');
            const modalNext = document.getElementById('modalNext');
            
            let currentIndex = 0;
            let isAnimating = false;
            
            // Открытие модального окна при клике на карточку
            screenshotCards.forEach(card => {
                card.addEventListener('click', function() {
                    currentIndex = parseInt(this.getAttribute('data-index'));
                    updateModalImage('none');
                    modal.classList.add('modal_active');
                    document.body.style.overflow = 'hidden';
                });
            });
            
            // Закрытие модального окна
            modalClose.addEventListener('click', function() {
                closeModal();
            });
            
            // Закрытие модального окна при клике вне изображения
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    closeModal();
                }
            });
            
            // Навигация между изображениями
            modalPrev.addEventListener('click', function(e) {
                e.stopPropagation();
                if (isAnimating) return;
                navigateToImage('prev');
            });
            
            modalNext.addEventListener('click', function(e) {
                e.stopPropagation();
                if (isAnimating) return;
                navigateToImage('next');
            });
            
            // Функция навигации с плавной анимацией
            function navigateToImage(direction) {
                isAnimating = true;
                
                // Убираем текущие классы анимации
                modalImg.classList.remove('slide-left', 'slide-right');
                
                // Определяем направление и обновляем индекс
                if (direction === 'prev') {
                    currentIndex = (currentIndex - 1 + screenshotCards.length) % screenshotCards.length;
                    modalImg.classList.add('slide-right');
                } else {
                    currentIndex = (currentIndex + 1) % screenshotCards.length;
                    modalImg.classList.add('slide-left');
                }
                
                // Обновляем изображение
                updateModalImage(direction);
                
                // Сбрасываем флаг анимации после завершения
                setTimeout(() => {
                    isAnimating = false;
                }, 500);
            }
            
            // Обновление изображения в модальном окне
            function updateModalImage(direction) {
                const currentCard = screenshotCards[currentIndex];
                const imgSrc = currentCard.querySelector('.screenshots__img').getAttribute('src');
                
                // Если это первоначальная загрузка (не навигация)
                if (direction === 'none') {
                    modalImg.setAttribute('src', imgSrc);
                    return;
                }
                
                // Для навигации - плавная смена с анимацией
                modalImg.style.opacity = '0';
                
                setTimeout(() => {
                    modalImg.setAttribute('src', imgSrc);
                    modalImg.style.opacity = '1';
                }, 200);
            }
            
            // Функция закрытия модального окна с анимацией
            function closeModal() {
                modal.classList.remove('modal_active');
                setTimeout(() => {
                    document.body.style.overflow = 'auto';
                }, 400);
            }
            
            // Навигация с помощью клавиатуры
            document.addEventListener('keydown', function(e) {
                if (modal.classList.contains('modal_active') && !isAnimating) {
                    if (e.key === 'Escape') {
                        closeModal();
                    } else if (e.key === 'ArrowLeft') {                        navigateToImage('prev');
                    } else if (e.key === 'ArrowRight') {
                        navigateToImage('next');
                    }
                }
            });
            
            // Добавляем анимацию появления при загрузке страницы
            setTimeout(() => {
                document.querySelectorAll('.screenshots__card').forEach(card => {
                    card.style.animationPlayState = 'running';
                });
            }, 100);
        });






         document.addEventListener('DOMContentLoaded', function() {
            const faqItems = document.querySelectorAll('.faq__item');
            
            faqItems.forEach(item => {
                const question = item.querySelector('.faq__question');
                
                question.addEventListener('click', () => {
                    // Закрываем все открытые элементы
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('faq__item--active')) {
                            otherItem.classList.remove('faq__item--active');
                        }
                    });
                    
                    // Переключаем текущий элемент
                    item.classList.toggle('faq__item--active');
                });
            });
        });




// Блокировка контекстного меню
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
});

// Блокировка сочетаний клавиш
document.addEventListener('keydown', function(e) {
    // Ctrl+U (просмотр исходного кода)
    if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault();
        return false;
    }
    // F12 (инструменты разработчика)
    if (e.keyCode === 123) {
        e.preventDefault();
        return false;
    }
});








        