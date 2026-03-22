A lightweight, zero-config Alpine.js directive to inject custom animated GIFs of your liking into static text using `:emoji:` syntax. 

## 1. Installation
1. Install latest version of AlpineJS 
2. Include `alpine-emoticons` script tag on your `<head>` 
```html
<!-- full version -->
<script src="">

<!-- or minified -->
<script src="">
```

## 2. Basic Usage
Wrap your text in a container using `x-data="emojiApp({...})"` and add the `x-emoji` directive.
⚠️ Emojis MUST be 1x1 or else it will be rejected

```html
<div x-data="emojiApp({
    'parrot': 'https://cultofthepartyparrot.com/parrots/hd/parrot.gif',
    'dance': 'https://cdn3.emoji.gg/emojis/440591-catwave.gif'
})">

    <div x-emoji="showEmoji" style="color: #ccff00; background: #000; padding: 20px;">
        SYSTEM: :parrot: initialization complete. Time to :dance:!
    </div>
    
    <button @click="showEmoji = !showEmoji">Toggle Emojis</button>
</div>
```





