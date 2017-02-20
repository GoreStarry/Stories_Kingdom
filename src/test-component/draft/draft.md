# Draft筆記

## Draft 主要資料結構

* EditorState
  * CurrntContent
    * blockMap
      * key
      * type
      * text
      * characterList
        * style
        * entity
      * entityRanges: [Array/List]
        * offset
        * length
        * key

    * entityMap: [Object/Map]
      * key
        * type (e.g. 'LINK', 'MENTION', 'PHOTO')
        * mutability
        * data 

  * selection

  * decorator [Array/List]
  ```
  const compositeDecorator = new CompositeDecorator([
    {
      strategy: hashtagStrategy,
      component: HashtagSpan,
    },
  ]);
  ```

---

## 主要機制

### Block Style

  藉由直接對整個block設定 "type"，來掛上指定className或wapper component。

  ### blockRenderMap
    
    當Editor在render EditorState資料結構中的block部分，發現type有被設定時，
    由blockRenderMap判定包覆element與wapper component的設定。

  ### blockStyleFn

    由block type判斷配佈給block的指定className。
---

### RichUtils
針對直接對 EditorState 做資料操作的 utility functions


### Modifier 
針對 CurrntContent 做資料操作的 utility functions


### Entities
相較直接針對block中字元做style操作，可直接藉由指定block內字元相對範圍（啟始點，長度），來定義特殊區塊性render的方式。
``` js
  contentState.createEntity({設定})
  //方法不會直接將制定的Entity掛載到contentState的entityMap中。
  //而是要先獲取創造的EntityKey
  contentState.getLastCreatedEntityKey
  //再用EntityKey連帶指定區域一起掛載
  //（immutable log無法看到entityMap中的掛載，必須先將currentContent轉成raw才看的到。
  //  contentBlock中掛在characterList中CharacterMetadata的entityKey也會改成在entityRanges用offset跟length的方式記錄。）
  Modifier.applyEntity(
    contentState,
    selectionState,
    entityKey
  );
```
### Decorator
掃描contentBlcok，配合Entitie的指定範圍可以來做區塊性的component render。
