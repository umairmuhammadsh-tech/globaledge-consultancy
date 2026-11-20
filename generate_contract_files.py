import os
import re
import shutil
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import qn, nsdecls

from reportlab.lib.pagesizes import letter
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    HRFlowable,
    KeepTogether,
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors

CONTRACT_MD_PATH = r"d:\Umair\Antigravity\globaledge-consultancy\LEGAL_STUDENT_CONTRACT.md"
DOCX_OUT_PATH = r"d:\Umair\Antigravity\globaledge-consultancy\LEGAL_STUDENT_CONTRACT.docx"
PDF_OUT_PATH = r"d:\Umair\Antigravity\globaledge-consultancy\LEGAL_STUDENT_CONTRACT.pdf"
PUBLIC_DOCX = r"d:\Umair\Antigravity\globaledge-consultancy\frontend\public\LEGAL_STUDENT_CONTRACT.docx"
PUBLIC_PDF = r"d:\Umair\Antigravity\globaledge-consultancy\frontend\public\LEGAL_STUDENT_CONTRACT.pdf"
BRAIN_DOCX = r"C:\Users\Administrator\.gemini\antigravity\brain\6fdcc67c-d63d-4a0a-9bd4-1e784da861d7\LEGAL_STUDENT_CONTRACT.docx"
BRAIN_PDF = r"C:\Users\Administrator\.gemini\antigravity\brain\6fdcc67c-d63d-4a0a-9bd4-1e784da861d7\LEGAL_STUDENT_CONTRACT.pdf"

def clean_markdown_to_xml(text):
    """Converts markdown bold, italics and breaks into valid ReportLab XML."""
    t = text.strip()
    # Replace breaks
    t = t.replace("<br />", "<br/>").replace("<br>", "<br/>")
    # Replace bullets
    t = t.replace("•", "&bull; ")
    # Replace selection boxes
    t = t.replace("☐ Select", "<b>[ &nbsp; ] Select</b>")
    t = t.replace("☐", "[ &nbsp; ]")
    # Convert bold+italic ***text*** -> <b><i>text</i></b>
    t = re.sub(r'\*\*\*(.*?)\*\*\*', r'<b><i>\1</i></b>', t)
    # Convert bold **text** -> <b>text</b>
    t = re.sub(r'\*\*(.*?)\*\*', r'<b>\1</b>', t)
    # Convert italic *text* -> <i>text</i>
    t = re.sub(r'\*(.*?)\*', r'<i>\1</i>', t)
    # Ensure ampersands are escaped except when already XML entities
    t = re.sub(r'&(?!(?:amp|bull|nbsp|quot|lt|gt);)', '&amp;', t)
    return t

def clean_markdown_plain(text):
    """Strips markdown asterisks for plain clean rendering."""
    t = text.strip()
    t = t.replace("**", "").replace("*", "")
    t = t.replace("<br />", "\n").replace("<br>", "\n")
    return t

# 1. CREATE WORD DOCX
def create_docx():
    doc = Document()

    # Set Margins
    for section in doc.sections:
        section.top_margin = Inches(0.8)
        section.bottom_margin = Inches(0.8)
        section.left_margin = Inches(0.8)
        section.right_margin = Inches(0.8)

    # Header / Title
    title = doc.add_heading(level=0)
    title_run = title.add_run("STUDENT CONSULTANCY & EDUCATIONAL ADVISORY SERVICES AGREEMENT")
    title_run.font.name = "Arial"
    title_run.font.size = Pt(15)
    title_run.font.bold = True
    title_run.font.color.rgb = RGBColor(30, 58, 95) # Navy #1e3a5f
    title.alignment = WD_ALIGN_PARAGRAPH.CENTER

    sub = doc.add_paragraph()
    sub_run = sub.add_run("GLOBALEDGE CONSULTANCY / HUZ GLOBAL SOLUTIONS (PRIVATE) LIMITED\nForm of Professional Educational Services Contract (Islamic Republic of Pakistan)")
    sub_run.font.name = "Arial"
    sub_run.font.size = Pt(9.5)
    sub_run.font.italic = True
    sub_run.font.color.rgb = RGBColor(110, 110, 110)
    sub.alignment = WD_ALIGN_PARAGRAPH.CENTER

    doc.add_paragraph().paragraph_format.space_after = Pt(8)

    with open(CONTRACT_MD_PATH, "r", encoding="utf-8") as f:
        lines = f.readlines()

    in_table = False
    table_rows = []

    for line in lines:
        stripped = line.strip()

        if stripped.startswith("# STUDENT CONSULTANCY"):
            continue

        if stripped.startswith("|"):
            in_table = True
            if not re.match(r'^\|[\s\-:]+\|$', stripped):
                cols = [c.strip() for c in stripped.split("|")[1:-1]]
                table_rows.append(cols)
            continue
        else:
            if in_table:
                if table_rows:
                    table = doc.add_table(rows=len(table_rows), cols=len(table_rows[0]))
                    table.alignment = WD_TABLE_ALIGNMENT.CENTER
                    table.style = 'Table Grid'
                    for r_idx, row in enumerate(table_rows):
                        for c_idx, cell in enumerate(row):
                            c = table.cell(r_idx, c_idx)
                            c.vertical_alignment = WD_ALIGN_VERTICAL.CENTER
                            c.text = ""
                            p = c.paragraphs[0]
                            p.paragraph_format.space_before = Pt(3)
                            p.paragraph_format.space_after = Pt(3)

                            # Style cell text
                            clean_text = cell.replace("<br>", "\n").replace("<br />", "\n")
                            # Shading for header
                            if r_idx == 0:
                                shading = parse_xml(f'<w:shd {nsdecls("w")} w:fill="1E3A5F"/>')
                                c._tc.get_or_add_tcPr().append(shading)
                                run = p.add_run(clean_markdown_plain(clean_text))
                                run.font.name = "Arial"
                                run.font.size = Pt(9)
                                run.font.bold = True
                                run.font.color.rgb = RGBColor(255, 255, 255)
                            else:
                                if r_idx % 2 == 1:
                                    shading = parse_xml(f'<w:shd {nsdecls("w")} w:fill="F8FAFC"/>')
                                    c._tc.get_or_add_tcPr().append(shading)
                                
                                # Render bold segments cleanly
                                parts = re.split(r'(\*\*.*?\*\*)', clean_text)
                                for part in parts:
                                    if part.startswith("**") and part.endswith("**"):
                                        r = p.add_run(part[2:-2])
                                        r.font.name = "Arial"
                                        r.font.size = Pt(8.5)
                                        r.font.bold = True
                                        r.font.color.rgb = RGBColor(30, 58, 95)
                                    else:
                                        r = p.add_run(clean_markdown_plain(part))
                                        r.font.name = "Arial"
                                        r.font.size = Pt(8.5)
                                        r.font.color.rgb = RGBColor(40, 40, 40)

                    doc.add_paragraph().paragraph_format.space_after = Pt(6)
                in_table = False
                table_rows = []

        if not stripped:
            continue

        if stripped.startswith("### "):
            h = doc.add_heading(level=2)
            hrun = h.add_run(stripped.replace("### ", ""))
            hrun.font.name = "Arial"
            hrun.font.size = Pt(11.5)
            hrun.font.bold = True
            hrun.font.color.rgb = RGBColor(30, 58, 95)
            h.paragraph_format.space_before = Pt(12)
            h.paragraph_format.space_after = Pt(4)
        elif stripped.startswith("#### "):
            h = doc.add_heading(level=3)
            hrun = h.add_run(stripped.replace("#### ", ""))
            hrun.font.name = "Arial"
            hrun.font.size = Pt(10.5)
            hrun.font.bold = True
            hrun.font.color.rgb = RGBColor(190, 130, 20)
            h.paragraph_format.space_before = Pt(8)
            h.paragraph_format.space_after = Pt(2)
        elif stripped.startswith("> "):
            p = doc.add_paragraph()
            p.paragraph_format.left_indent = Inches(0.4)
            p.paragraph_format.right_indent = Inches(0.4)
            run = p.add_run(stripped.replace("> ", "").replace('"', ''))
            run.font.name = "Arial"
            run.font.size = Pt(9)
            run.font.italic = True
        elif stripped == "---":
            p = doc.add_paragraph()
            p.paragraph_format.space_after = Pt(4)
        else:
            p = doc.add_paragraph()
            p.paragraph_format.space_after = Pt(3.5)
            # Parse bold chunks
            parts = re.split(r'(\*\*.*?\*\*)', stripped)
            for part in parts:
                if part.startswith("**") and part.endswith("**"):
                    run = p.add_run(part[2:-2])
                    run.font.name = "Arial"
                    run.font.size = Pt(9.5)
                    run.font.bold = True
                else:
                    run = p.add_run(part)
                    run.font.name = "Arial"
                    run.font.size = Pt(9.5)

    doc.save(DOCX_OUT_PATH)
    print("DOCX successfully generated:", DOCX_OUT_PATH)

# 2. CREATE PDF WITH REPORTLAB
def create_pdf():
    pdf = SimpleDocTemplate(
        PDF_OUT_PATH,
        pagesize=letter,
        rightMargin=40,
        leftMargin=40,
        topMargin=40,
        bottomMargin=40,
    )

    styles = getSampleStyleSheet()
    
    primary_color = colors.HexColor("#1e3a5f")
    gold_color = colors.HexColor("#b87a10")
    text_color = colors.HexColor("#1e293b")
    border_color = colors.HexColor("#cbd5e1")
    alt_row_color = colors.HexColor("#f8fafc")

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=13.5,
        leading=16.5,
        textColor=primary_color,
        alignment=1, # Center
        spaceAfter=3,
    )

    sub_style = ParagraphStyle(
        'DocSub',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=8.5,
        leading=11,
        textColor=colors.HexColor("#64748b"),
        alignment=1,
        spaceAfter=12,
    )

    h2_style = ParagraphStyle(
        'Heading2Custom',
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=13,
        textColor=primary_color,
        spaceBefore=9,
        spaceAfter=3,
        keepWithNext=True,
    )

    body_style = ParagraphStyle(
        'BodyCustom',
        fontName='Helvetica',
        fontSize=8,
        leading=11,
        textColor=text_color,
        spaceAfter=3.5,
    )

    quote_style = ParagraphStyle(
        'QuoteCustom',
        fontName='Helvetica-Oblique',
        fontSize=8,
        leading=11,
        textColor=colors.HexColor("#334155"),
        leftIndent=15,
        rightIndent=15,
        spaceBefore=4,
        spaceAfter=4,
    )

    table_cell_style = ParagraphStyle(
        'TableCell',
        fontName='Helvetica',
        fontSize=7.5,
        leading=9.5,
        textColor=text_color,
    )

    table_cell_center = ParagraphStyle(
        'TableCellCenter',
        fontName='Helvetica',
        fontSize=7.5,
        leading=9.5,
        textColor=text_color,
        alignment=1,
    )

    table_header_style = ParagraphStyle(
        'TableHeader',
        fontName='Helvetica-Bold',
        fontSize=7.5,
        leading=9.5,
        textColor=colors.white,
    )

    table_header_center = ParagraphStyle(
        'TableHeaderCenter',
        fontName='Helvetica-Bold',
        fontSize=7.5,
        leading=9.5,
        textColor=colors.white,
        alignment=1,
    )

    story = []

    story.append(Paragraph("STUDENT CONSULTANCY & EDUCATIONAL ADVISORY SERVICES AGREEMENT", title_style))
    story.append(Paragraph("GLOBALEDGE CONSULTANCY / HUZ GLOBAL SOLUTIONS (PVT.) LTD. &bull; ISLAMIC REPUBLIC OF PAKISTAN", sub_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=primary_color, spaceAfter=8))

    with open(CONTRACT_MD_PATH, "r", encoding="utf-8") as f:
        lines = f.readlines()

    in_table = False
    table_rows = []

    for line in lines:
        stripped = line.strip()
        if stripped.startswith("# STUDENT CONSULTANCY"):
            continue

        if stripped.startswith("|"):
            in_table = True
            if not re.match(r'^\|[\s\-:]+\|$', stripped):
                cols = [c.strip() for c in stripped.split("|")[1:-1]]
                table_rows.append(cols)
            continue
        else:
            if in_table:
                if table_rows:
                    t_data = []
                    for r_idx, row in enumerate(table_rows):
                        r_data = []
                        for c_idx, c in enumerate(row):
                            # Convert markdown formatting cleanly to XML
                            formatted = clean_markdown_to_xml(c)
                            if r_idx == 0:
                                st = table_header_center if (c_idx == 2 or c_idx == 3) else table_header_style
                            else:
                                st = table_cell_center if (c_idx == 2 or c_idx == 3) else table_cell_style
                            r_data.append(Paragraph(formatted, st))
                        t_data.append(r_data)
                    
                    # Available printable width: 612 - 80 = 532
                    col_widths = [85, 275, 95, 77]
                    t = Table(t_data, colWidths=col_widths)
                    
                    t_style = [
                        ('BACKGROUND', (0, 0), (-1, 0), primary_color),
                        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
                        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
                        ('GRID', (0, 0), (-1, -1), 0.5, border_color),
                        ('TOPPADDING', (0, 0), (-1, -1), 4),
                        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
                        ('LEFTPADDING', (0, 0), (-1, -1), 5),
                        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
                    ]
                    # Alternating row background for readability
                    for r_i in range(1, len(table_rows)):
                        if r_i % 2 == 1:
                            t_style.append(('BACKGROUND', (0, r_i), (-1, r_i), alt_row_color))

                    t.setStyle(TableStyle(t_style))
                    story.append(Spacer(1, 4))
                    story.append(t)
                    story.append(Spacer(1, 6))
                in_table = False
                table_rows = []

        if not stripped:
            continue

        if stripped.startswith("### "):
            text = stripped.replace("### ", "")
            story.append(Paragraph(clean_markdown_to_xml(text), h2_style))
        elif stripped.startswith("> "):
            text = stripped.replace("> ", "").replace('"', '')
            story.append(Paragraph(f"<i>&ldquo;{clean_markdown_to_xml(text)}&rdquo;</i>", quote_style))
        elif stripped == "---":
            story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#e2e8f0"), spaceAfter=5, spaceBefore=4))
        else:
            story.append(Paragraph(clean_markdown_to_xml(stripped), body_style))

    pdf.build(story)
    print("PDF successfully generated:", PDF_OUT_PATH)

if __name__ == "__main__":
    create_docx()
    create_pdf()

    # Copy files to public and brain artifact
    for src, dst in [(DOCX_OUT_PATH, PUBLIC_DOCX), (PDF_OUT_PATH, PUBLIC_PDF),
                     (DOCX_OUT_PATH, BRAIN_DOCX), (PDF_OUT_PATH, BRAIN_PDF)]:
        shutil.copyfile(src, dst)
        print(f"Copied {src} -> {dst}")
