if (canvas.tokens.controlled == 0) {
  ui.notifications.warn("You must select a token.");
  return
}

actor.data.data.skills.thi.roll(event);

////////////// To chat message data /////////////////

let toChat = (content) => {
    let chatData = {
        user: game.user.id,
        content,
        speaker: ChatMessage.getSpeaker(),
    }

    ChatMessage.create(chatData, {})
}

//////////// To chat message data //////////////////


            toChat(`<div><h3 style='border-bottom: 3px solid black'>Steal</h3></div>
            <div style="color:#131516;margin-top:4px;">
            You try to take a small object from another creature without being noticed. Typically, you can Steal only an object of negligible Bulk, and you automatically fail if the creature who has the object is in combat or on guard.<br>

            <br>Attempt a Thievery check to determine if you successfully Steal the object. The DC to Steal is usually the Perception DC of the creature wearing the object. This assumes the object is worn but not closely guarded (like a loosely carried pouch filled with coins, or an object within such a pouch). If the object is in a pocket or similarly protected, you take a -5 penalty to your Thievery check. The GM might increase the DC of your check if the nature of the object makes it harder to steal (such as a very small item in a large pack, or a sheet of parchment mixed in with other documents).<br>

            <br>You might also need to compare your Thievery check result against the Perception DCs of observers other than the person wearing the object. The GM may increase the Perception DCs of these observers if they're distracted.
            <div style="border-bottom: 2px solid black;color:#131516;padding-bottom:4px;">
            <b style="color:#990000">
            </div>
            <div><h3 style='border-bottom: 3px solid black'>✔️ Success!</h3></div>
            <div style="color:#131516;margin-top:4px;">
            You steal the item without the bearer noticing, or an observer doesn't see you take or attempt to take the item.
            <div style="border-bottom: 2px solid black;color:#131516;padding-bottom:4px;">
            <b style="color:#990000">
            </div>
            <div><h3 style='border-bottom: 3px solid black'>❌ Fail!</h3></div>
            <div style="color:#131516;margin-top:4px;">
            The item's bearer notices your attempt before you can take the object, or an observer sees you take or attempt to take the item. The GM determines the response of any creature that notices your theft.
            <div style="border-bottom: 2px solid black;color:#131516;padding-bottom:4px;">
            <b style="color:#990000">
            </div>`)