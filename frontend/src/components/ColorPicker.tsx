import { HexColorPicker } from 'react-colorful';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

function ColorPicker({ color, onChange }: ColorPickerProps) {
  return (
    <div>
      <HexColorPicker
        color={color}
        onChange={onChange}
        style={{ width: '100%', height: '150px' }}
      />
      <div className="d-flex align-items-center gap-2 mt-2">
        <span className="fw-bold" style={{ fontSize: '0.9rem' }}>Color del equipo</span>
        <div
          style={{
            width: '36px',
            height: '36px',
            backgroundColor: color,
            border: '1px solid #ccc',
          }}
        />
      </div>
    </div>
  );
}

export default ColorPicker;