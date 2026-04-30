🔄 Обновление `SPEC.md` (фрагмент)

Замени раздел про Google Books API на:

```markdown
## 🌐 Open Library API

### Базовый запрос
```

GET https://openlibrary.org/search.json
?subject={category}
&limit=6
&offset={startIndex}
&language=eng

````

### Категории (примеры)
```js
export const CATEGORIES = {
  'Fiction': 'fiction',
  'Technology': 'technology',
  'Business': 'business',
  'Science': 'science',
  'History': 'history',
  'Art': 'art'
};
````

### Особенности

- 🔑 **Ключ не требуется** — запросы анонимные
- 🌍 **Доступен из РФ** без ограничений
- 🖼️ **Обложки**: через CDN `covers.openlibrary.org/b/id/{id}-{S/M/L}.jpg`
- 💰 **Цена**: не предоставляется → использовать моковые данные
- ⭐ **Рейтинг**: есть не у всех книг → условный рендеринг

```

---

## 🚀 Альтернативы на будущее

| Сервис | Ключ | Карта | РФ-доступ | Примечание |
|--------|------|-------|-----------|------------|
| **Open Library** | ❌ Нет | ❌ Нет | ✅ Да | ✅ Лучший выбор сейчас |
| **ISBNdb** | ✅ Да | ⚠️ Иногда | ⚠️ Неизвестно | Бесплатно только 250 запросов/день |
| **Penguin Random House** | ✅ Да | ❌ Нет | ✅ Да | Только их каталог, нужна модерация |
| **Публичные датасеты** | ❌ Нет | ❌ Нет | ✅ Да | Статичные JSON-файлы, без поиска |

---

## ✅ Чек-лист перехода на Open Library

- [ ] Обновить `SPEC.md`: заменить Google Books → Open Library
- [ ] Удалить `.env` и `dotenv-webpack` из зависимостей (ключ больше не нужен!)
- [ ] Переписать `books-api.js` под новый эндпоинт
- [ ] Добавить моковую генерацию цены в маппинг ответов
- [ ] Протестировать запрос в браузере:
  `https://openlibrary.org/search.json?subject=fiction&limit=3`
```
