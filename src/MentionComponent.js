import React ,{ useState }  from 'react'
import mentionOptions from './MentionOption.json'


const MentionComponent = () => {
    const [text, setText] = useState('');
    const [mention, setMention] = useState(null);
  
    const handleInputChange = (e) => {
      const newText = e.target.value;
      setText(newText);
  
      // Check if "@" is present in the text
      if (newText.includes('@')) {
        // Display the dropdown
        setShowDropdown(true);
      } else {
        // Hide the dropdown
        setShowDropdown(false);
      }
    };
  
  
  const handleSelectMention = (selectedMention) => {
      const newText = `@${selectedMention.first_name + ' ' +selectedMention.last_name} hello`
      setText(newText);
      setMention(selectedMention);
      setShowDropdown(false); // Hide the dropdown after selecting a mention
    };
    
  
    const mentionQuery = text.match(/@(\w+)/);
  const filteredMentionOptions = mentionQuery
    ? mentionOptions.filter((option) =>
        option.first_name.toLowerCase().includes(mentionQuery[1].toLowerCase())
      )
    : mentionOptions;

    const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div className='Container'>
        <input
        type="text"
        value={text}
        onChange={handleInputChange}
        placeholder="Type your message..."
      />
      {/* Mention options dropdown */}
      {showDropdown && (
        <div className="mention-dropdown">
          {filteredMentionOptions.slice(0, 10).map((mentionOption) => (
            <div
              key={mentionOption.id}
              onClick={() => handleSelectMention(mentionOption)}
            >
              {mentionOption.first_name}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MentionComponent