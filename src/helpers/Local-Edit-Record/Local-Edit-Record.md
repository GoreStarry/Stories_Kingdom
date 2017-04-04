# Save Some LocalStorage

localStorage key will be the ObjectID of story

```json

{
  [story_id]: {
    last_edited_article: `ObjectId`,
    update_cache: [{
      story_id: `ObjectId`,
      article_id: `ObjectId`,
      contentState: `String`
    }]
  }
}

```

| Name | Type | Description |
|---|---|---|
| `last_edit_article` | String | Object ID of article user edit at last |
| `update_cache` | Object | when article can't be updated, then the cache will be put in update_cache |
